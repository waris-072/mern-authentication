import { useEffect, useState } from "react";
import { getProfile, getAllUsers, logoutUser, toggleUserRole, deleteUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminStats from "./AdminStats";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import AdminToolbar from "./AdminToolbar";
import "../App.css";
import "./admin.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getProfile();
        setUser(profileRes.data.user);

        const usersRes = await getAllUsers();
        setUsers(usersRes.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users
  .filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  })
  .sort((a,b)=>{
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const clearFilters = () =>{
    setSearchTerm("")
    setRoleFilter("all")
    setSortOrder("newest")
  };

  const handleRoleToggle = async (id) => {
    const confirmed = window.confirm(`Change ${user.name}'s role?`);
    if(!confirmed) return;
    try {
      const res = await toggleUserRole(id);

      setUsers((prev) =>
        prev.map((user) => user._id === id ? res.data.user : user)
      );
    } catch (error) {
      setError( error.response?.data?.message);
    }
  };

  const handleDeleteUser = async (id) =>{
    const confirmed = window.confirm("Are you sure you want to delete this user? ");
    if(!confirmed) return;
    try{
      const res = await deleteUser(id);
      alert(res.data.message);

      setUsers((prevUsers) => prevUsers.filter((user)=> user._id !== id) );

    }catch(error){
      alert( error.response?.data?.message)
    }
  }

  return (
    <div className="admin-container">
      <AdminNavbar user={user} onLogout={handleLogout} onView={() => handleViewUser(user)} />

      <AdminToolbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        roleFilter={roleFilter} 
        setRoleFilter={setRoleFilter} 
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        clearFilters={clearFilters}
      />

      <div className="stats-container">
        <AdminStats users={users} />
      </div>

      <UsersTable users={filteredUsers} onView={handleViewUser} onRoleToggle={handleRoleToggle} onDelete={handleDeleteUser}/>

      {selectedUser && (<UserModal user={selectedUser} 
        onClose={handleCloseModal}  />
      )}
      
    </div>
  );
};

export default Dashboard;
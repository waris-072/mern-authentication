import { useEffect, useState } from "react";
import { getProfile, logoutUser, getAllUsers } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const profile = await getProfile();
      setUser(profile.data.user);

      const res = await getAllUsers();
      setUsers(res.data.users);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Admin Dashboard</h2>

      {user && (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </>
      )}

      <hr />

      <h3>Registered Users</h3>

      {users.map((u) => (
        <div key={u._id} style={{ borderBottom: "1px solid #ccc", marginBottom: 10 }}>
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Role:</b> {u.role}</p>
        </div>
      ))}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
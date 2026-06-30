import { useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";


const AdminNavbar = ({ user, onLogout, onView }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="admin-navbar">
      <div className="navbar-title">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="navbar-profile">
        <div className="profile-trigger" onClick={() => setOpen(!open)} >
          <div className="avatar"> {user?.name?.charAt(0).toUpperCase()} </div>
          <FaChevronDown className="dropdown-icon" />
        </div>

        {open && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <div className="avatar large-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h4>{user?.name}</h4>

              <p>{user?.role}</p>
            </div>

            <hr />

            <button
              className="dropdown-item"
              onClick={() => {
                onView();
                setOpen(false);
              }}
            >
              <FaUser />
              <span>View Profile</span>
            </button>

            <button className="dropdown-item logout" 
             onClick={() => { onLogout(); setOpen(false); }} >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
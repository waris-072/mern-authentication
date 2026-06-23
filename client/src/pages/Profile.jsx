import { useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.log("Not authenticated");
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="auth-container">
      <h2>Profile</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      {/* ADMIN LINK */}
      {user.role === "admin" && (
        <Link to="/dashboard">
          Go to Dashboard
        </Link>
      )}

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
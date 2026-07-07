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
        const loggedInUser = res.data.user;

        if (loggedInUser.role === "admin") {
          navigate("/dashboard");
          return;
        }
        setUser(loggedInUser);

      } catch (err) {
        console.log("Not authenticated");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

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

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
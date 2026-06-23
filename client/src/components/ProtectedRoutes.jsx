import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { Navigate } from "react-router-dom";

const ProfileRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile();
        setAuth(true);
      } catch (err) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  return auth ? children : <Navigate to="/login" />;
};


const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await getProfile();

        if (res.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <p>Loading...</p>;
  return isAdmin ? children : <Navigate to="/profile" />;
};


export { ProfileRoute, AdminRoute };
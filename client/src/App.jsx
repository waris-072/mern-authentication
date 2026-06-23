import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import {ProfileRoute, AdminRoute} from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <ProfileRoute> 
            <Profile />     
          </ProfileRoute>   
        }/>
        <Route path="/dashboard" element={
          <AdminRoute> 
            <Dashboard />     
          </AdminRoute>   
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
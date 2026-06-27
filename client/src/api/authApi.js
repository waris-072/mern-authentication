import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");
export const getProfile = () => API.get("/user/profile");
export const getAllUsers = () => API.get("/admin");

export const toggleUserRole = (id) => API.patch(`/admin/users/${id}/role`);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
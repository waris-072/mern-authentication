import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("Interceptor fired");
    console.log("Request:", error.config?.url);
    console.log("Status:", error.response?.status);

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/login")
    ) {
      console.log("Refreshing token...");

      originalRequest._retry = true;

      try {
        const res = await API.post("/auth/refresh");
        console.log("Refresh success", res.status);

        return API(originalRequest);
      } catch (err) {
        console.log("Refresh failed", err.response?.status);

        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");
export const getProfile = () => API.get("/user/profile");
export const getAllUsers = () => API.get("/admin");

export const toggleUserRole = (id) => API.patch(`/admin/users/${id}/role`);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
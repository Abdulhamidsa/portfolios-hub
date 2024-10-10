import { baseUrl } from "@/config/apiEndpoints";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
  withCredentials: true,
});
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const navigate = useNavigate();
      try {
        await axiosInstance.post("/auth/refresh-token");
        const newAccessToken = Cookies.get("accessToken");
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Failed to refresh access token:", err);
        localStorage.removeItem("isAuthenticated");
        navigate("/guest");
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

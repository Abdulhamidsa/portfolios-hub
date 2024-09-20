import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:4000";
export const endPoints = {
  frontpage: {
    projects: baseUrl + "/project/projects_home",
  },
  auth: {
    signin: baseUrl + "/user/signin",
    register: baseUrl + "/user/register",
    logout: baseUrl + "/user/logout",
    refreshToken: baseUrl + "/user/refresh-token",
  },
  user: {
    profile: baseUrl + "/user/profile",
    updateProfile: baseUrl + "/user/update-profile",
    changePassword: baseUrl + "/user/change-password",
  },
  project: {
    create: baseUrl + "/project/create",
    update: baseUrl + "/project/update",
    delete: baseUrl + "/project/delete",
    getById: baseUrl + "/project/get",
  },
} as const;

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

      try {
        await axiosInstance.post("/auth/refresh-token");
        const newAccessToken = Cookies.get("accessToken");
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Failed to refresh access token:", err);
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

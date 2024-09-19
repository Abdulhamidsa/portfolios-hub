import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log("Retrieved accessToken from cookies:", accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.warn("No access token found");
      }
    } catch (error) {
      console.error("Error retrieving access token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

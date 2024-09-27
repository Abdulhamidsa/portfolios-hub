import apiClient from "@/api/axiosConfig";
import { endPoints } from "@/config/apiEndpoints";

export const useSignIn = () => {
  const signIn = async (data) => {
    try {
      const response = await apiClient.post(endPoints.auth.signin, data);
      if (response?.data?.result) {
        return {
          result: true,
          message: response?.data?.message || "Login successful!",
        };
      } else {
        return {
          result: false,
          message: response?.data?.message || "Login failed. Please try again.",
        };
      }
    } catch (error) {
      return {
        result: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  return signIn;
};

export const useSignOut = () => {
  const signOut = async () => {
    try {
      const response = await apiClient.post(endPoints.auth.logout);
      if (response?.data?.result) {
        return {
          result: true,
          message: response?.data?.message || "Logout successful!",
        };
      } else {
        return {
          result: false,
          message: response?.data?.message || "Logout failed. Please try again.",
        };
      }
    } catch (error) {
      return {
        result: false,
        message: error.response?.data?.message || "Logout failed. Please try again.",
      };
    }
  };

  return signOut;
};

export const useCheckAuth = () => {
  const checkAuth = async () => {
    try {
      const response = await apiClient.get(endPoints.auth.checkAuth);
      if (response?.data?.result) {
        return {
          result: true,
          message: response?.data?.message || "User is authenticated",
        };
      } else {
        return {
          result: false,
          message: response?.data?.message || "User is not authenticated",
        };
      }
    } catch (error) {
      return {
        result: false,
        message: error.response?.data?.message || "User is not authenticated",
      };
    }
  };

  return checkAuth;
};

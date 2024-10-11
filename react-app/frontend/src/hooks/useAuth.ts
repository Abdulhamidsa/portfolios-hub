import apiClient from "@/api/axiosConfig";
import { endPoints } from "@/config/apiEndpoints";
import { useAuth } from "@/context/authContext";

export const useSignIn = () => {
  const { login } = useAuth();

  type SignInData = {
    email: string;
    password: string;
  };

  const signIn = async (data: SignInData) => {
    try {
      const response = await apiClient.post(endPoints.user.auth.signin, data);
      console.log(response);
      if (response?.data?.result) {
        const userData = response.data.result;
        login(userData);
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
  const { logout } = useAuth();
  const signOut = async () => {
    try {
      const response = await apiClient.post(endPoints.user.auth.logout);
      if (response?.data?.result) {
        const userData = response.data.result;
        logout(userData);
        return {
          result: true,
          message: response?.data?.message || "Logout successful!",
        };
      }
      return {
        result: false,
        message: response?.data?.message || "Logout failed. Please try again.",
      };
    } catch (error) {
      return {
        result: false,
        message: error.response?.data?.message || "Logout failed due to a network error. Please try again.",
      };
    }
  };

  return signOut;
};
export const useCheckAuth = () => {
  const checkAuth = async () => {
    try {
      const response = await apiClient.get(endPoints.user.auth.checkAuth);
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

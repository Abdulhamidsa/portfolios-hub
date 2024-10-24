import { endPoints } from "@/config/apiEndpoints";
import apiClient from "@/config/axiosConfig";
import { useAuth } from "@/context/AuthContext";

export const useSignIn = () => {
  type SignInData = {
    email: string;
    password: string;
  };

  const signIn = async (data: SignInData) => {
    try {
      const response = await apiClient.post(endPoints.user.auth.signin, data);
      if (response?.data?.result) {
        return {
          result: true,
          message: response?.data?.message || "Login successful! Redirecting.... ",
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

type SignUpData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile?: string;
  dateOfBirth?: Date;
  password: string;
  profilePicture?: string;
  bio?: string;
  profession: string;
  country: string;
  links: { name: string; url: string }[];
};

export const useSignUp = () => {
  const signUp = async (data: SignUpData) => {
    try {
      const response = await apiClient.post(endPoints.user.auth.register, data);
      if (response?.data?.result) {
        return {
          result: true,
          message: response?.data?.message || "Signup successful! Redirecting....",
        };
      } else {
        return {
          result: false,
          message: response?.data?.message || "Signup failed. Please try again.",
        };
      }
    } catch (error) {
      return {
        result: false,
        message: error.response?.data?.message || "Signup failed due to a network error. Please try again.",
      };
    }
  };

  return signUp;
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

import { endPoints } from "@/api/axiosConfig";
import axiosInstance from "@/api/axiosConfig";

const useSignIn = () => {
  const signIn = async (data: object) => {
    try {
      const response = await axiosInstance.post(endPoints.auth.signin, data);
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
  return {
    signIn,
  };
};

export default useSignIn;

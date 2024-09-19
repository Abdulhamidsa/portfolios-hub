import { endPoints } from "@/api/axiosConfig";
import { fetcher } from "@/services/api";
import useSWR, { mutate } from "swr";

const useSignIn = () => {
  const { error, isValidating } = useSWR(null, null);

  const signIn = async (data: object) => {
    try {
      const response = await mutate(endPoints.auth.signin, fetcher(endPoints.auth.signin, data), false);
      console.log(response);
      if (response?.result) {
        return { result: true, message: response?.message || "Login successful!" };
      } else {
        return { result: false, message: response?.message || "Login failed. Please try again." };
      }
    } catch (error) {
      return { result: false, message: (error as Error).message || "Login failed. Please try again." };
    }
  };

  return {
    signIn,
    loading: isValidating,
    error,
  };
};

export default useSignIn;

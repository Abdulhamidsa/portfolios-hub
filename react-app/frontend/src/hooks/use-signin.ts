import { endPoints } from "@/confige/api.config";
import { fetcher } from "@/services/api";

const signin = async (data: object) => {
  try {
    const response = await fetcher(endPoints.auth.signin, data);

    if (response?.result) {
      return { result: true, message: response?.message || "Login successful!" };
    } else {
      return { result: false, message: response?.message || "Login failed. Please try again." };
    }
  } catch (error) {
    if (error) {
      return { result: false, message: (error as Error).message || "Login failed. Please try again." };
    } else {
      return { result: false, message: "Login failed. Please try again." };
    }
  }
};

export { signin };

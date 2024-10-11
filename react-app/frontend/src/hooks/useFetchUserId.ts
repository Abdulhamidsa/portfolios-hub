import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";

// Define the shape of the decoded token
interface DecodedToken {
  userId: string;
  exp: number; // Optional, include if you need to check expiration
}

// Fetch user ID from the access token
const fetchUserId = async () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  // Decode the token using jwtDecode
  const decoded = jwtDecode<DecodedToken>(token); // Specify the type here

  // Optional: Check if the token is valid and not expired
  const currentTime = Date.now() / 1000; // Convert to seconds
  if (decoded.exp && decoded.exp < currentTime) {
    throw new Error("Access token has expired");
  }

  return decoded.userId;
};

// Custom hook to use user ID
const useUserId = () => {
  return useQuery("userId", fetchUserId, {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false, // Disable retries if you want
    onError: (error) => {
      console.error("Error fetching user ID:", error);
    },
  });
};

export default useUserId;

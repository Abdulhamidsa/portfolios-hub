import { axiosInstance } from "@/api/axiosConfig";
import endPoints from "@/config/apiEndpoints";
import { useState, useEffect } from "react";

interface PersonalInfo {
  profilePicture: string;
  bio: string;
  profession: string;
  country: string;
  links: Array<{ name: string; url: string; _id: string }>;
}

export interface UserData {
  userType: string;
  _id: string;
  friendlyId: string;
  personalInfo: PersonalInfo;
  userRole: string;
  approved: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endPoints.user.profile);
      if (response.data.result) {
        setUser(response.data.data);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("An error occurred while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetch: fetchUser };
};

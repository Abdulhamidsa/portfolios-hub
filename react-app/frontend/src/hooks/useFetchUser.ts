import { endPoints } from "@/config/apiEndpoints";
import { getData } from "@/services/api";
import useSWR from "swr";

export type PersonalInfo = {
  profilePicture: string;
  bio: string;
  friendlyId: string;
  profession: string;
  country: string;
  username: string;
  links: Array<{ name: string; url: string; _id: string }>;
};

export type Credentials = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
};

export type UserInfo = {
  friendlyId: string;
  personalInfo: PersonalInfo;
  userRole: string;
  approved: boolean;
  createdAt: string;
};

export type UserData = {
  userInfo: UserInfo;
  userCredential: Credentials;
};

export const useUser = () => {
  const { data, error, isLoading } = useSWR<UserData>(endPoints.user.private.profile, getData, { suspense: true });

  const userInfo = data?.userInfo;
  const userCredential = data?.userCredential;

  return { userInfo, userCredential, isLoading, error };
};
export const useAllUsers = () => {
  const { data, error, isLoading } = useSWR<UserInfo>(endPoints.user.public.projects, getData, { suspense: true });
  const users = data;
  return { users, isLoading, error };
};

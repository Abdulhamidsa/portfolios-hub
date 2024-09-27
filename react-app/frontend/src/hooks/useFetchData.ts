import { endPoints } from "@/config/apiEndpoints";
import { getData, ApiResponse } from "@/services/api";
import useSWR from "swr";

export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  projectUrl: string;
  projectThumbnail: string;
  projectImage: string[];
  tags: string[];
  likes: string[];
};

type ProjectApiResponse = ApiResponse<ProjectItem[]>;

export const useProject = () => {
  const { data, error, isValidating, isLoading } = useSWR<ProjectApiResponse>(endPoints.user.UserProjects, getData, { suspense: true });

  return { data, error, isValidating, isLoading };
};

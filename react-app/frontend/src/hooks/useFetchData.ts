import { endPoints } from "@/api/axiosConfig";
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
  const { data, error, isValidating, isLoading } = useSWR<ProjectApiResponse>(endPoints.frontpage.projects, getData, { suspense: true });

  return { data: data?.data, error, isValidating, isLoading };
};

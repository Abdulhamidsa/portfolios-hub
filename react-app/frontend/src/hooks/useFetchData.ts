import { endPoints } from "@/config/apiEndpoints";
import { getData, ApiResponse, fetcher } from "@/services/api";
import useSWR, { mutate } from "swr";

type userProject = {
  personalInfo: {
    profilePicture: string;
    username: string;
  };
};
export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  userId: userProject;
  projectUrl: string;
  projectThumbnail: string;
  projectImage: string[];
  tags: string[];
  createdAt: string;
  likeCount: number;
  likedByUser: boolean;
};
type UserProjects = ApiResponse<ProjectItem[]>;
export const useProject = () => {
  const { data, error, isLoading } = useSWR<UserProjects>(endPoints.project.private.getById, getData, {
    suspense: true,
  });
  return { userProject: data, error, isLoading };
};
export const usePublicProject = () => {
  const { data, error, isLoading } = useSWR<UserProjects>(endPoints.project.public.all, getData, {
    suspense: true,
  });
  const allProjects = data || [];
  return { allProjects, error, isLoading };
};
type ProjectUploadResponse = {
  success: boolean;
  message: string;
  data?: ProjectItem;
};
export const useUploadProject = () => {
  const uploadProject = async (newProject: Partial<ProjectItem>) => {
    try {
      const response = await fetcher<ProjectUploadResponse>(endPoints.project.private.create, newProject);
      if (response.result) {
        mutate(endPoints.project.private.getById);
      }
      return response;
    } catch (error) {
      console.error("Error uploading project:", error);
    }
  };

  return { uploadProject };
};

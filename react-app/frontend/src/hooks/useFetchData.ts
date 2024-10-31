import { endPoints } from "@/config/apiEndpoints";
import { getData, ApiResponse, fetcher } from "@/services/api";
import useSWR, { mutate } from "swr";

type UserProject = {
  personalInfo: {
    profilePicture: string;
    username: string;
  };
};

export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  userId: UserProject;
  projectUrl: string;
  projectThumbnail: string;
  projectImage: string[];
  tags: string[];
  createdAt: string;
  likeCount: number;
  likedByUser: boolean;
};

type UserProjects = ApiResponse<ProjectItem[]>;

export const useProjects = (isUserProfile: boolean) => {
  const endpoint = isUserProfile ? endPoints.project.private.getById : endPoints.project.public.all;
  const { data, error } = useSWR<UserProjects>(endpoint, getData, {
    suspense: true,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    projects: data || [],
    error,
    isLoading: !error && !data,
  };
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

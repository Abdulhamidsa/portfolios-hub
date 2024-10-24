import { endPoints } from "@/config/apiEndpoints";
import { fetcher } from "@/services/api";

export const toggleLikeService = async (projectId: string) => {
  const response = await fetcher(`${endPoints.project.private.toggleLike}/${projectId}`, {});
  return response;
};

// import { endPoints } from "@/config/apiEndpoints";
// import { fetcher } from "@/services/api";
// import { useCallback } from "react";
// // Import your fetcher
// import useSWR, { mutate } from "swr";

// // Adjust the import as needed

// export const useToggleLike = (projectId) => {
//   const toggleLike = useCallback(async () => {
//     // Optimistically update local data
//     const updatedProjects = await mutate(
//       endPoints.project.public.all,
//       (data) => {
//         return data.map((project) => {
//           if (project._id === projectId) {
//             return {
//               ...project,
//               likedByUser: !project.likedByUser,
//               likeCount: project.likedByUser ? project.likeCount - 1 : project.likeCount + 1,
//             };
//           }
//           return project;
//         });
//       },
//       false
//     );

//     try {
//       // Use the fetcher to toggle like
//       const response = await fetcher(`${endPoints.project.private.toggleLike}/${projectId}`, {});

//       // Check response and update if successful
//       if (response.result) {
//         // Optionally update selectedProject if it's stored in state
//         return true; // Indicate success
//       } else {
//         throw new Error("Failed to toggle like");
//       }
//     } catch (error) {
//       console.error(error);
//       // If the API call fails, revert the optimistic update
//       mutate(endPoints.project.public.all, updatedProjects, false);
//       return false; // Indicate failure
//     }
//   }, [projectId]);

//   return { toggleLike };
// };

import { endPoints } from "@/config/apiEndpoints";
import { fetcher } from "@/services/api";

const toggleLike = async (projectId: string) => {
  const response = await fetcher(`${endPoints.project.private.toggleLike}/${projectId}`, {});
  return response.data;
};

export { toggleLike };

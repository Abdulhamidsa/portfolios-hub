import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { endPoints } from "@/config/apiEndpoints";
import { useDialog } from "@/hooks/useDialog";
import { ProjectItem, useProjects } from "@/hooks/useFetchData";
import ProjectDialog from "@/pages/userApp/components/ProjectDialog";
import ProjectsSkeleton from "@/pages/userApp/components/feedback/ProjectsSkeleton";
import { toggleLikeService } from "@/services/toggleLikeService";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";

type ProjectCardProps = {
  filterFunction?: (project: ProjectItem) => boolean;
  isUserProfile?: boolean;
};
export default function ProjectCard({ filterFunction, isUserProfile }: ProjectCardProps) {
  const { toggleDialog, isOpen, setSelectedProject, selectedProject, handleProjectClick } = useDialog();
  const [visibleProjects, setVisibleProjects] = useState(10);
  const { projects, isLoading } = useProjects(isUserProfile);
  const filteredProjects = projects.filter((project) => (filterFunction ? filterFunction(project) : true)) || [];

  const loadMoreProjects = () => {
    setVisibleProjects((prevVisible) => prevVisible + 10);
  };
  const toggleLike = async (projectId: string) => {
    if (!selectedProject || selectedProject._id !== projectId) return;
    const newLikeStatus = !selectedProject.likedByUser;
    const updatedProject = {
      ...selectedProject,
      likedByUser: newLikeStatus,
      likeCount: selectedProject.likeCount + (newLikeStatus ? 1 : -1),
    };
    try {
      const response = await toggleLikeService(projectId);
      if (response.result) {
        setSelectedProject(updatedProject);
        mutate(
          endPoints.project.public.all,
          projects.map((project: ProjectItem) => (project._id === projectId ? updatedProject : project)),
          false
        );
      } else {
        mutate(endPoints.project.public.all, projects, false);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-950 min-h-screen">
      {isLoading ? (
        <ProjectsSkeleton />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.slice(0, visibleProjects).map((project: ProjectItem) => (
              <Card key={project._id} className="overflow-hidden flex flex-col rounded-lg bg-gray-900 text-gray-100 border border-gray-800 hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 h-[400px]">
                <CardHeader className="p-0 overflow-hidden h-48">
                  <Button variant="ghost" className="w-full h-full p-0 relative group" onClick={() => handleProjectClick(project)}>
                    <img src={project.projectThumbnail || "/public/projectPlaceHolder.png"} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                  </Button>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <CardTitle className="mb-2 line-clamp-1 text-xl font-semibold">{project.title}</CardTitle>
                    <p className="text-sm text-gray-400 line-clamp-3 mb-4">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {visibleProjects < filteredProjects.length && (
            <div className="flex justify-center mt-8 text-black">
              <Button variant="outline" onClick={loadMoreProjects}>
                See more
              </Button>
            </div>
          )}
        </div>
      )}
      <ProjectDialog isOpen={isOpen} toggleDialog={toggleDialog} selectedProject={selectedProject} toggleLike={toggleLike} />
    </div>
  );
}

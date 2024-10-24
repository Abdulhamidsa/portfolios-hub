import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { endPoints } from "@/config/apiEndpoints";
import { usePublicProject, ProjectItem } from "@/hooks/useFetchData";
import ProjectsSkeleton from "@/pages/userApp/components/feedback/ProjectsSkeleton";
import { toggleLikeService } from "@/services/toggleLikeService";
import { Heart, ExternalLink } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";

export default function ProjectCard() {
  const { allProjects, isLoading } = usePublicProject();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(10);

  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

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
          allProjects.map((project: ProjectItem) => (project._id === projectId ? updatedProject : project)),
          false
        );
      } else {
        mutate(endPoints.project.public.all, allProjects, false);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-950 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-100">Explore Amazing Projects</h1>
      {isLoading ? (
        <ProjectsSkeleton />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProjects.slice(0, visibleProjects).map((project: ProjectItem) => (
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
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={project.userId.personalInfo.profilePicture} alt={project.userId.personalInfo.username} />
                        <AvatarFallback>{project.userId.personalInfo.username[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-400 truncate max-w-[100px]">{project.userId.personalInfo.username}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{project.likeCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {visibleProjects < allProjects.length && (
            <div className="flex justify-center mt-8 text-black">
              <Button variant="outline" onClick={loadMoreProjects}>
                See more
              </Button>
            </div>
          )}
        </div>
      )}

      {selectedProject && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl bg-gray-900 text-gray-100">
            <DialogHeader>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage className="object-cover" src={selectedProject.userId.personalInfo.profilePicture} />
                  <AvatarFallback>{selectedProject.title.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{selectedProject.userId.personalInfo.username}</h1>
                </div>
              </div>
            </DialogHeader>

            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {selectedProject.projectImage.map((image, index) => (
                  <CarouselItem key={index}>
                    <img src={image} alt={`${selectedProject.title} - Image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 text-black" />
              <CarouselNext className="right-2 text-black" />
            </Carousel>

            <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
            <p className="text-sm text-gray-300 mb-4">{selectedProject.description}</p>

            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" size="sm" className={`flex items-center ${selectedProject.likedByUser ? "bg-green-100 text-black border-green-600 " : "bg-gray-800 text-white border-gray-700"}`} onClick={() => toggleLike(selectedProject._id)}>
                <Heart className={`w-4 h-4 mr-2 ${selectedProject.likedByUser ? "text-green-300" : ""}`} />
                {selectedProject.likedByUser ? "Liked" : "Like"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

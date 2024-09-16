import { apiRequest } from "../../services/api";
import { endPoints } from "../confige/api.config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  projectUrl: string;
  projectThumbnail: string;
  projectImage: string[];
  tags: string[];
  likes: string[];
}

interface ApiResponse {
  data: ProjectItem[];
}

const useMyData = () => {
  const { data, isValidating, isLoading, error } = useSWR<ApiResponse>(endPoints.frontpage.projects, apiRequest);
  return { data, error, isValidating, isLoading };
};

const ProjectCard = () => {
  const { data } = useMyData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsOpen(true);
  };
  // console.log(data);
  return (
    <div className="w-full flex flex-wrap gap-4">
      {data?.data?.map((item: ProjectItem) => (
        <div key={uuidv4()} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <Button variant="ghost" className="w-full p-0 h-auto" onClick={() => handleProjectClick(item)}>
                <img src={item.projectThumbnail} alt={item.title} className="w-full h-[200px] object-cover" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag: string) => (
                  <Badge key={uuidv4()} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </Button>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm">{item.likes}</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
      {selectedProject && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogTitle>{selectedProject.title}</DialogTitle>
            <Carousel>
              <CarouselContent>
                {selectedProject.projectImage.map((image, index) => (
                  <CarouselItem key={uuidv4()}>
                    <img src={image} alt={`${selectedProject.title} - Image ${index + 1}`} className="w-full h-auto" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default ProjectCard;

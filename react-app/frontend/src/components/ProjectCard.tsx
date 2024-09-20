import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useProject, ProjectItem } from "@/hooks/useFetchData";
import { Heart, MessageCircle, Flag, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ProjectCard() {
  const { data, error } = useProject();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsOpen(true);
  };
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="w-full flex flex-wrap gap-4">
      {data?.map((item: ProjectItem) => (
        <div key={item._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
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
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span className="text-sm">{item.likes}</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
      {selectedProject && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent aria-describedby={undefined} className="max-w-xl">
            <DialogHeader>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={"/placeholder.svg?height=40&width=40"} />
                  <AvatarFallback>{selectedProject.title.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle>{selectedProject.title}</DialogTitle>
                  <p className="text-sm text-muted-foreground">{"Unknown Author"}</p>
                </div>
              </div>
            </DialogHeader>
            <Carousel>
              <CarouselPrevious className=" z-40 absolute left-0 top-1/2 transform -translate-y-1/2" />
              <CarouselNext className=" z-40 absolute right-0 top-1/2 transform -translate-y-1/2" />
              <CarouselContent className="relative">
                {selectedProject.projectImage.map((image, index) => (
                  <CarouselItem key={uuidv4()}>
                    <img src={image} alt={`${selectedProject.title} - Image ${index + 1}`} className="w-80 h-auto m-auto" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground mb-4">{selectedProject.description}</p>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

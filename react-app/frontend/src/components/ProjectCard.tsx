import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useProject, ProjectItem } from "@/hooks/useFetchData";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Flag, ThumbsUp, Eye } from "lucide-react";
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
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Projects</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data.map((item: ProjectItem) => (
          <motion.div key={item._id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="overflow-hidden h-full flex flex-col">
              <CardHeader className="p-0">
                <Button variant="ghost" className="w-full p-0 h-auto relative group" onClick={() => handleProjectClick(item)}>
                  <img src={item.projectThumbnail} alt={item.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </Button>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="mb-2 line-clamp-1">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={uuidv4()} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Button variant="outline" size="sm" asChild>
                  <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Button>
                <div className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1 text-blue-500" />
                  <span className="text-sm font-medium">{item.likes}</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={selectedProject.projectThumbnail} />
                  <AvatarFallback>{selectedProject.title.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-xl">{selectedProject.title}</DialogTitle>
                  <p className="text-sm text-muted-foreground">By Unknown Author</p>
                </div>
              </div>
            </DialogHeader>
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {selectedProject.projectImage.map((image, index) => (
                  <CarouselItem key={uuidv4()}>
                    <img src={image} alt={`${selectedProject.title} - Image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground mb-4">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tags.map((tag: string) => (
                <Badge key={uuidv4()} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center text-red-500 hover:text-red-600">
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

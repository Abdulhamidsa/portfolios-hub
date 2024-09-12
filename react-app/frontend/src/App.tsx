import "./App.css";
import { getData } from "../services/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Suspense, useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

const baseUrl = "http://localhost:4000";
const endPoints = {
  frontpage: {
    projects: baseUrl + "/api/projects",
    users: baseUrl + "/api/user",
  },
  auth: {
    login: baseUrl + "/api/auth/login",
    register: baseUrl + "/api/register",
    password: baseUrl + "/api/password",
    changePassword: baseUrl + "/changePassword",
  },
} as const;

const useMyData = () => {
  const { data, isValidating, isLoading, error } = useSWR(endPoints.frontpage.projects, getData, { suspense: true });
  return { data, error, isValidating, isLoading };
};

interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  projectUrl: string;
  projectThumbnail: string;
  projectImage: string[];
  tags: string[];
  userId: string;
  likes: string[];
  __v: number;
}

const MyComponent = () => {
  const { data } = useMyData();
  // console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

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
                <span className="text-sm">{item.likes.length}</span>
              </div>
              <span className="text-sm text-muted-foreground">ID: {item._id}</span>
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

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
      <h2>hey</h2>
    </>
  );
}

export default App;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectItem, Image } from "@/hooks/useFetchData";
import { Heart } from "lucide-react";

type DialogComponentProps = {
  isOpen: boolean;
  toggleDialog: () => void;
  selectedProject: ProjectItem | null;
  toggleLike?: (projectId: string) => void;
};
const DialogComponent: React.FC<DialogComponentProps> = ({ isOpen, toggleDialog, selectedProject, toggleLike }) => {
  if (!selectedProject) return null;
  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className=" max-w-2xl bg-gray-900 text-gray-100">
        <DialogHeader>
          {selectedProject.userId && (
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage className="object-cover" src={selectedProject.userId.personalInfo.profilePicture} alt={`${selectedProject.userId.personalInfo.username}'s profile picture`} />
                <AvatarFallback>{selectedProject.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{selectedProject.userId.personalInfo.username}</h1>
              </div>
            </div>
          )}
        </DialogHeader>
        <Carousel className="w-full max-w-xl mx-auto">
          <CarouselContent>
            {selectedProject.projectImage.map((image: Image, index: number) => (
              <CarouselItem key={image.id}>
                <img src={image.url} alt={`${selectedProject.title} - Image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          {selectedProject.projectImage.length > 1 && (
            <>
              <CarouselPrevious className="left-2 text-black" />
              <CarouselNext className="right-2 text-black" />
            </>
          )}
        </Carousel>
        <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
        <p className="text-sm text-gray-300 mb-4">{selectedProject.description}</p>
        <div className="flex gap-3 items-center mt-4">
          <span className=" bg-white rounded-full p-2 cursor-pointer">
            <Heart size={30} className={` stroke-none p-1 ${selectedProject.likedByUser ? " fill-cyan-200 " : " stroke-cyan-200"}`} onClick={() => toggleLike(selectedProject._id)} />
          </span>
          {selectedProject.likeCount}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;

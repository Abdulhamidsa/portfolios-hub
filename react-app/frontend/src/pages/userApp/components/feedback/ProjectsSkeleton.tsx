import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Projects</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="overflow-hidden h-full flex flex-col rounded-sm bg-212121 text-fff border-2 border-gray-900">
            <CardHeader className="p-0 overflow-hidden">
              <Skeleton className="w-full h-48" />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex items-center">
                <Skeleton className="h-4 w-8" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={false}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarFallback>
                  <Skeleton className="h-full w-full" />
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">
                  <Skeleton className="h-6 w-48" />
                </DialogTitle>
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </DialogHeader>
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {[...Array(3)].map((_, index) => (
                <CarouselItem key={index}>
                  <Skeleton className="w-full h-64 rounded-lg" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <Separator className="my-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-9 w-32 mb-4" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProjectsSkeleton;

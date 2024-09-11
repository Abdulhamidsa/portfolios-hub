import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function ProjectCard({ item }: { item: ProjectItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full p-0 h-auto"></Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <Carousel>
              <CarouselContent>
                {item.projectImage.map((index: string) => (
                  <CarouselItem key={index}></CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2">{item.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" className="w-full" asChild>
          <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
            <a className="w-4 h-4 mr-2" />
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
  );
}

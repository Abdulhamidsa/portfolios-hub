import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ProjectItem, useProject, useUploadProject } from "@/hooks/useFetchData";
import { useUser } from "@/hooks/useFetchUser";
import { projectUploadSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Link as LinkIcon, Grid, Image, Heart, Calendar, Mail, Briefcase, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EnhancedProfile() {
  const { userInfo, userCredential } = useUser();
  const { userProject } = useProject();
  const { uploadProject } = useUploadProject();
  const [activeTab, setActiveTab] = useState("projects");
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(projectUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      projectThumbnail: "",
      projectUrl: "",
    },
  });

  if (!userInfo) return null;

  const onSubmit = async (values: object): Promise<void> => {
    const response = await uploadProject(values);
    if (response.result && Array.isArray(userProject)) {
      userProject.push(values);
    }
    setIsAddProjectOpen(false);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border-0 text-white text-left">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <Avatar className="w-48 h-48 rounded-2xl border-4 border-white/20 shadow-xl">
                  <AvatarImage src={userInfo.personalInfo.profilePicture} alt={userInfo.personalInfo.username} className="object-cover" />
                  <AvatarFallback>{userInfo.personalInfo.username[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{`${userCredential?.firstName} ${userCredential?.lastName}`}</h1>
                    <p className="text-xl text-cyan-300">@{userInfo.personalInfo.username}</p>
                  </div>
                </div>
                <p className="text-lg mb-6">{userInfo.personalInfo.bio}</p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{userInfo.personalInfo.country}</span>
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="w-5 h-5 mr-2" />
                    <a href={userInfo.personalInfo.links[0].url} target="_blank" rel="noopener noreferrer" className="transition-colors">
                      {userInfo.personalInfo.links[0].name}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                    <span>Joined {new Date(userInfo.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-cyan-400" />
                    <span>{userCredential?.email}</span>
                  </div>
                </div>
                <div className="flex space-x-4 mb-6">
                  <Badge variant="secondary" className="bg-cyan-800 text-cyan-200 hover:bg-cyan-700 px-3 py-1 text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {userInfo.personalInfo.profession}
                  </Badge>
                </div>
              </div>
            </div>
            <Separator className="my-8 bg-white/20" />
            <div className="flex justify-around">
              <div className="text-center">
                <span className="text-3xl font-bold text-cyan-300">{userProject.length}</span>
                <p className="text-sm text-cyan-100">Projects</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-cyan-300">0</span>
                <p className="text-sm text-cyan-100">Followers</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-cyan-300">0</span>
                <p className="text-sm text-cyan-100">Following</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="w-full bg-gray-900 p-1 rounded-xl">
            <TabsTrigger value="projects" className="flex-1 py-3 data-[state=active]:bg-cyan-800 data-[state=active]:text-cyan-100 rounded-lg transition-all">
              <Image className="w-5 h-5 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex-1 py-3 data-[state=active]:bg-cyan-800 data-[state=active]:text-cyan-100 rounded-lg transition-all">
              <Grid className="w-5 h-5 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex-1 py-3 data-[state=active]:bg-cyan-800 data-[state=active]:text-cyan-100 rounded-lg transition-all">
              <Heart className="w-5 h-5 mr-2" />
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-8">
            <div className="space-y-6">No Posts Yet</div>
          </TabsContent>

          <TabsContent value="projects" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card onClick={() => setIsAddProjectOpen(true)} className="aspect-square bg-gray-900 flex items-center justify-center rounded-xl hover:opacity-80 transition-opacity cursor-pointer">
                <PlusCircle className="w-12 h-12 text-cyan-300" />
              </Card>
              {Array.isArray(userProject) &&
                userProject.map((project: ProjectItem) => (
                  <Card key={project._id} className="aspect-square bg-gray-900 overflow-hidden rounded-xl hover:opacity-80 transition-opacity">
                    <img src={project.projectThumbnail || "/projectPlaceHolder.png"} alt={project.title} className="w-full h-full object-cover" />
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="likes" className="mt-8">
            <Card className="aspect-square bg-gray-900 overflow-hidden rounded-xl hover:opacity-80 transition-opacity">Liked Projects Coming Soon</Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Project Upload Modal */}
      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {["title", "description", "projectThumbnail", "projectUrl"].map((field) => (
                <FormItem key={field}>
                  <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}</FormLabel>
                  <FormControl>{field === "description" ? <Textarea placeholder={`Enter ${field}`} {...form.register(field)} /> : <Input placeholder={`Enter ${field}`} {...form.register(field)} />}</FormControl>
                  <FormMessage>{form.formState.errors[field]?.message}</FormMessage>
                </FormItem>
              ))}

              <Button type="submit" className="w-full mt-6">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

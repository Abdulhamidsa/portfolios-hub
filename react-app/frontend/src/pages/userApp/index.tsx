import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectItem, usePublicProject } from "@/hooks/useFetchData";
import { useAllUsers } from "@/hooks/useFetchUser";
import { useUser } from "@/hooks/useFetchUser";
import { Plus } from "lucide-react";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserApp() {
  // const [startIndex, setStartIndex] = useState(0);
  // const [userStartIndex, setUserStartIndex] = useState(0);
  const { allProjects } = usePublicProject();
  const [selectedUser, setSelectedUser] = useState(null);
  const { userInfo } = useUser();
  console.log(userInfo);
  const loggedInUserId = userInfo?.personalInfo.username;
  const { users } = useAllUsers();

  // const nextProjects = () => {
  //   setStartIndex((prevIndex) => Math.min(prevIndex + 1, allProjects.length - 1));
  // };
  // const prevProjects = () => {
  //   setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  // };
  // const nextUsers = () => {
  //   setUserStartIndex((prevIndex) => Math.min(prevIndex + 1, users.length - 4));
  // };

  // const prevUsers = () => {
  //   setUserStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  // };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50" />
        <img src="/guest-bg.png" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Explore Amazing Projects</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8">Discover and share creative work from around the world</p>
          <Link to="/Profile">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-8 px-4 bg-secondary">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Featured Projects</h2>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex overflow-hidden">
            {allProjects
              .filter((project: ProjectItem) => project.userId.personalInfo.profession === userInfo?.personalInfo.profession || allProjects.indexOf(project) < 5)
              .map((project: ProjectItem) => (
                <Card key={project._id} className="w-full sm:w-[calc(100%-1rem)] md:w-[calc(33.333%-1rem)] flex-shrink-0 mx-2">
                  <CardContent className="p-4">
                    <img src={project.projectThumbnail} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 truncate">{project.title}</h3>
                  </CardContent>
                  <CardFooter className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={project.userId.personalInfo.profilePicture} alt={project.userId.personalInfo.username} />
                      <AvatarFallback>{project.userId.personalInfo.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Connect With Others</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex overflow-hidden">
            {users
              .filter((user) => user.personalInfo.username !== loggedInUserId)
              .map((user) => (
                <Card key={user.friendlyId} className="w-full sm:w-[calc(100%-1rem)] md:w-[calc(33.333%-1rem)] flex-shrink-0 mx-2" onClick={() => setSelectedUser(user)}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={user.personalInfo.profilePicture} alt={user.personalInfo.username} className="object-cover" />
                        <AvatarFallback>{user.personalInfo.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold mb-1 text-center">{user.personalInfo.username}</h3>
                      <Badge variant="secondary" className="mb-2">
                        {user.personalInfo.profession}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.personalInfo.country}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent className="sm:max-w-[425px]">
              {selectedUser && (
                <>
                  <div className="flex flex-col items-center">
                    <Avatar className="w-32 h-32 mb-4">
                      <AvatarImage src={selectedUser.personalInfo.profilePicture} alt={selectedUser.personalInfo.username} className="object-cover" />
                      <AvatarFallback>{selectedUser.personalInfo.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex justify-center space-x-4 mb-4"></div>
                    <h3 className="font-semibold text-lg mb-2">{selectedUser.personalInfo.username}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {selectedUser.personalInfo.profession}
                    </Badge>
                    <p className="text-sm text-center mb-4">{selectedUser.personalInfo.bio}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedUser.personalInfo.country}
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <section className="py-8 px-4 bg-secondary">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Browse Categories
          </Button>
        </div>
      </section>
    </div>
  );
}

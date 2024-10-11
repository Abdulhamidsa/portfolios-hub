import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/useFetchUser";
import { CalendarDays, MapPin, Briefcase, Link as LinkIcon } from "lucide-react";

export default function Profile() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center">No user data available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal and account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.personalInfo.profilePicture} alt={user.personalInfo.profession} />
                <AvatarFallback>{user.personalInfo.profession[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{user.personalInfo.profession}</h2>
                <p className="text-muted-foreground">{user.friendlyId}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" /> Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" /> {user.personalInfo.country}
              </p>
              <p className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" /> {user.personalInfo.profession}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Bio</h3>
              <p>{user.personalInfo.bio}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Links</CardTitle>
            <CardDescription>Your professional links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.personalInfo.links.map((link) => (
                <Button key={link._id} variant="outline" className="w-full" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Last updated: {new Date(user.updatedAt).toLocaleString()}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="w-48 h-8 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg md:col-span-3" />
      </div>
    </div>
  );
}

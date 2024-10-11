import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="container mx-auto p-4 dark">
      <h1 className="text-3xl font-bold mb-6 text-primary">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-card">
          <CardHeader>
            <CardTitle className="text-primary">Profile Information</CardTitle>
            <CardDescription className="text-muted-foreground">Your personal and account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.personalInfo.profilePicture} alt={user.personalInfo.profession} />
                <AvatarFallback>{user.personalInfo.profession[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-primary">{user.personalInfo.profession}</h2>
                <p className="text-muted-foreground">{user.friendlyId}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-muted-foreground">
                <CalendarDays className="mr-2 h-4 w-4" /> Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" /> {user.personalInfo.country}
              </p>
              <p className="flex items-center text-muted-foreground">
                <Briefcase className="mr-2 h-4 w-4" /> {user.personalInfo.profession}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-primary">Bio</h3>
              <p className="text-muted-foreground">{user.personalInfo.bio}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-card">
          <CardHeader>
            <CardTitle className="text-primary">Links</CardTitle>
            <CardDescription className="text-muted-foreground">Your professional links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.personalInfo.links.map((link) => (
                <Button key={link._id} variant="outline" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80" asChild>
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
    <div className="container mx-auto p-4 dark">
      <Skeleton className="w-48 h-8 mb-6 bg-muted" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Skeleton className="h-[300px] w-full rounded-lg bg-muted" />
        </div>
        <Skeleton className="h-[300px] w-full rounded-lg bg-muted" />
        <Skeleton className="h-[200px] w-full rounded-lg md:col-span-3 bg-muted" />
      </div>
    </div>
  );
}

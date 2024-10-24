'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Link as LinkIcon, Grid, Bookmark, Settings, Users, Calendar, Mail } from "lucide-react"

type PersonalInfo = {
  profilePicture: string;
  bio: string;
  friendlyId: string;
  profession: string;
  country: string;
  username: string;
  links: Array<{ name: string; url: string; _id: string }>;
};

type Credentials = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
};

type UserInfo = {
  friendlyId: string;
  personalInfo: PersonalInfo;
  userRole: string;
  approved: boolean;
  createdAt: string;
};

type UserData = {
  userInfo: UserInfo;
  userCredential: Credentials;
};

// Dummy data
const dummyUser: UserData = {
  userInfo: {
    friendlyId: "johndoe123",
    personalInfo: {
      profilePicture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
      bio: "Passionate web developer | Coffee enthusiast | Travel lover",
      friendlyId: "johndoe123",
      profession: "Full Stack Developer",
      country: "United States",
      username: "john_doe",
      links: [
        { name: "Portfolio", url: "https://johndoe.dev", _id: "1" },
        { name: "GitHub", url: "https://github.com/johndoe", _id: "2" },
      ],
    },
    userRole: "user",
    approved: true,
    createdAt: "2023-01-15T00:00:00.000Z",
  },
  userCredential: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dateOfBirth: "1990-01-01",
  },
};

export function UniqueProfileComponent() {
  const { userInfo, userCredential } = dummyUser;
  const { personalInfo } = userInfo;
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <CardContent className="relative px-6 py-10">
            <Avatar className="absolute -top-16 left-6 w-32 h-32 border-4 border-gray-800 shadow-lg">
              <AvatarImage src={personalInfo.profilePicture} alt={personalInfo.username} />
              <AvatarFallback>{personalInfo.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">{`${userCredential.firstName} ${userCredential.lastName}`}</h1>
                <p className="text-gray-400">@{personalInfo.username}</p>
              </div>
              <div className="mt-4 md:mt-0 space-x-2">
                <Button size="sm">Follow</Button>
                <Button size="sm" variant="outline">Message</Button>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{personalInfo.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {personalInfo.country}
              </div>
              <div className="flex items-center">
                <LinkIcon className="w-4 h-4 mr-1" />
                <a href={personalInfo.links[0].url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.links[0].name}
                </a>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {new Date(userInfo.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {userCredential.email}
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="text-center">
                <span className="font-bold text-xl">254</span>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <span className="font-bold text-xl">14.3k</span>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <span className="font-bold text-xl">1,432</span>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
            <Badge variant="secondary" className="mb-4">
              {personalInfo.profession}
            </Badge>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="w-full bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="posts" className="flex-1 py-2">
              <Grid className="w-4 h-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="media" className="flex-1 py-2">
              <Bookmark className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex-1 py-2">
              <Users className="w-4 h-4 mr-2" />
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300">This is a sample post {index + 1}. It could contain text, images, or other content.</p>
                  <div className="mt-4 flex justify-between text-gray-400 text-sm">
                    <span>2 hours ago</span>
                    <div className="flex space-x-4">
                      <span>5 Likes</span>
                      <span>2 Comments</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="media" className="mt-6">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, index) => (
                <Card key={index} className="aspect-square bg-gray-800 overflow-hidden">
                  <img
                    src={`https://picsum.photos/400?random=${index}`}
                    alt={`Media ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="likes" className="mt-6">
            <p className="text-center text-gray-400">Liked content will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
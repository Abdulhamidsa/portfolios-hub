import { useUser } from "../../../hooks/useFetchUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, User, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("personal");
  const { userInfo, userCredential } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(userInfo?.personalInfo?.profilePicture || "");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleUpdate();
    }
  };

  const handleUpdate = () => {
    console.log("Updated Personal Info:", userInfo);
    console.log("Updated Credentials:", userCredential);
    console.log("Updated Profile Picture URL:", profilePictureUrl);
    setIsEditing(false);
  };

  return (
    <div className=" pt-10 flex h-screen bg-gray-950 text-gray-100 text-left">
      <div className={`fixed top-0 left-0 z-10 w-64 bg-gray-900 p-4 flex flex-col h-full transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative`}>
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Settings</h1>
        <nav className="space-y-2 flex-grow">
          <Button variant={activeTab === "personal" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("personal")}>
            <User className="mr-2 h-4 w-4" />
            <span className=" inline">Personal Information</span>
          </Button>
          <Button variant={activeTab === "credentials" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("credentials")}>
            <Shield className="mr-2 h-4 w-4" />
            <span className=" inline">Credentials</span>
          </Button>
        </nav>
      </div>

      <div className="p-3 flex-1 md:p-8 overflow-auto bg-gray-950 relative">
        <Button variant="ghost" className=" z-20  top-4 left-4 rounded-full bg-gray-800 p-2 flex items-center justify-center md:hidden" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <ChevronLeft className="h-6 w-6 text-gray-100" /> : <ChevronRight className="h-6 w-6 text-gray-100" />}
        </Button>

        {activeTab === "personal" && userInfo && (
          <div className="max-w-4xl mx-auto text-left">
            <h2 className=" text-lg md:text-3xl font-bold mb-6 text-gray-100">Personal Information</h2>
            <Card className=" pt-4 bg-gray-900 text-gray-100 border-gray-800 md:p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profilePictureUrl} alt={userInfo.friendlyId} className="object-cover rounded-full" />
                    <AvatarFallback>{userCredential?.firstName?.[0]}</AvatarFallback>
                  </Avatar>
                  {isEditing && <Input type="url" placeholder="Profile Picture URL" value={profilePictureUrl} onChange={(e) => setProfilePictureUrl(e.target.value)} className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500" />}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "First Name",
                      value: userCredential.firstName,
                      name: "firstName",
                    },
                    {
                      label: "Last Name",
                      value: userCredential.lastName,
                      name: "lastName",
                    },
                    {
                      label: "Username",
                      value: userInfo.personalInfo.username,
                      name: "username",
                    },
                    { label: "Email", value: userCredential.email, name: "email" },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col space-y-1">
                      <Label className="text-gray-300">{field.label}</Label>
                      <Input name={field.name} value={field.value} disabled={!isEditing} className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500" />
                    </div>
                  ))}
                </div>

                <Button onClick={toggleEditing} className="mb-6">
                  {isEditing ? "Save" : "Edit"}
                </Button>

                <div className="flex items-center text-gray-400">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Joined {new Date(userInfo.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "credentials" && userCredential && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Credentials</h2>
            <Card className="bg-gray-900 text-gray-100 border-gray-800 p-6">
              <CardContent className="space-y-4">
                {[
                  {
                    label: "First Name",
                    value: userCredential.firstName,
                    name: "firstName",
                  },
                  {
                    label: "Last Name",
                    value: userCredential.lastName,
                    name: "lastName",
                  },
                  {
                    label: "Username",
                    value: userInfo.personalInfo.username,
                    name: "username",
                  },
                  { label: "Email", value: userCredential.email, name: "email" },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col space-y-1">
                    <Label className="text-gray-300">{field.label}</Label>
                    <Input name={field.name} value={field.value} disabled={!isEditing} className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
        {activeTab === "settings" && <div>Settings</div>}
      </div>
    </div>
  );
}

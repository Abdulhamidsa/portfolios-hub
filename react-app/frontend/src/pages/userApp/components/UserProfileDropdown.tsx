import { useSignOut } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useFetchUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserProfileDropdown() {
  const { userCredential, userInfo } = useUser();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 bg-transparent shadow-none md:h-10 md:w-auto md:px-4 md:py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userInfo?.personalInfo.profilePicture} alt={userCredential?.firstName} />
            <AvatarFallback>{userCredential?.firstName?.[0]} </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block">{userCredential?.firstName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">{userCredential?.email}ss</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 pl-2" asChild>
          <Link to="/profile">
            <div className="flex cursor-pointer items-center space-x-2 w-full pt-2 pb-1 hover:bg-gray-100">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 pl-2" asChild>
          <Link to="/settings">
            <div className="flex cursor-pointer items-center space-x-2 w-full pt-2 pb-1 hover:bg-gray-100">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 pl-2" asChild>
          <Link to="/" onClick={handleSignOut}>
            <div className="flex cursor-pointer items-center space-x-2 w-full pt-2 pb-1 hover:bg-gray-100">
              <LogOut className=" h-4 w-4" />
              <span>Sign Out</span>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

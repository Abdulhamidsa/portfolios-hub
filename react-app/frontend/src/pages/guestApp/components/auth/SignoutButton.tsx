import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut} className=" w-full bg-transparent">
      <LogOut className=" h-4" />
    </Button>
  );
}

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { useState } from "react";

// Ensure the correct import path

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const signOut = useSignOut();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={isLoading} className="w-full sm:w-auto">
      {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <LogOut className="mr-2 h-4 w-4" />}
      {isLoading ? "Signing Out..." : "Sign Out"}
    </Button>
  );
}

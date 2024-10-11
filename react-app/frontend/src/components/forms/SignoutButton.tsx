import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useSignOut } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import this

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SheetClose asChild>
      <Button className="w-fit" variant="outline" onClick={handleSignOut} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <LogOut className=" h-4 w-4" />}
      </Button>
    </SheetClose>
  );
}

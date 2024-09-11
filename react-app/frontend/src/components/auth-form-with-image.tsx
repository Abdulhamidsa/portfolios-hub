import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// import Image from "next/image";
import { useState } from "react";

// import { cn } from "@/lib/utils"

export function AuthFormWithImage() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isLogin && !formData.get("name")) {
      setError("Please enter your name");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Form submitted:", Object.fromEntries(formData));
  };

  return (
    <div className="flex flex-col  lg:flex-row w-full max-w-6xl mx-auto bg-white  overflow-hidden">
      <div className="lg:w-1/2 relative">
        <img src="../../public/vite.svg" alt="Authentication visual" className="object-cover w-full h-full"></img>
      </div>
      <div className="lg:w-1/2 p-8 sm:p-12 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p className="text-muted-foreground">{isLogin ? "Log in to your account" : "Sign up for a new account"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full">
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </form>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <div className="flex items-center space-x-2">
            <Switch id="auth-mode" checked={isLogin} onCheckedChange={setIsLogin} />
            <Label htmlFor="auth-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {isLogin ? "Login" : "Sign Up"}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

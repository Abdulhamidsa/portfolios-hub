import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignupForm from "@/pages/guestApp/components/auth/SignUpForm";
import SigninForm from "@/pages/guestApp/components/auth/SigninForm";
import { useState } from "react";

const GuestApp = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative h-dvh flex items-center justify-center">
      <img src="/guestMain.png" alt="Full page background" className="absolute inset-0 w-full h-full object-cover z-0" />
      <Card className=" z-10 h-fit w-full max-w-4xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 md:p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold">{isSignIn ? "Sign In" : "Sign Up"}</CardTitle>
              <CardDescription>{isSignIn ? "Welcome back! Please sign in to your account." : "Create an account to get started."}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isSignIn ? <SigninForm /> : <SignupForm />}
              <div className="mt-6 text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                  <Button variant="link" className="p-0 h-auto font-medium" onClick={toggleForm}>
                    {isSignIn ? "Sign up here" : "Sign in here"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </div>
          <div className="md:w-1/2 bg-primary text-primary-foreground p-6 md:p-8 flex items-center justify-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-4">{isSignIn ? "Welcome Back" : "Join Us Today"}</h1>
              <p className="text-lg mb-6">{isSignIn ? "Sign in to access your protected content and enjoy our services." : "Sign up to get started with our amazing features and services."}</p>
              <ul className="list-disc list-inside space-y-2 text-left">
                <li>Create your own portfolio</li>
                <li>Personilize your dashboard</li>
                <li>Connect with others that have the same passionate</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GuestApp;

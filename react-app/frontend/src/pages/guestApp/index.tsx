import SignupForm from "@/components/auth/SignUpForm";
import SigninForm from "@/components/auth/SigninForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const GuestApp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="relative h-dvh flex items-center justify-center">
      <img src="/guest-bg.png" alt="Full page background" className="absolute inset-0 w-full h-full object-cover z-0" />
      <Card className="z-10 h-fit w-full max-w-3xl mx-auto overflow-hidden text-left">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-full p-4 md:p-6">
            <CardContent className="p-0">
              {isSignIn ? <SigninForm /> : <SignupForm setIsSignIn={setIsSignIn} />}
              <div className="mt-4 text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  {isSignIn ? "Don't have an account?" : "Already have an account?"}
                  <Button variant="link" className="p-0 h-auto font-medium" onClick={toggleForm}>
                    {isSignIn ? "Sign up here" : "Sign in here"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </div>
          <div className="md:w-full bg-primary text-primary-foreground p-4 md:p-6 flex items-center justify-center">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold mb-4">{isSignIn ? "Welcome Back" : "Join Us Today"}</h1>
              <p className="text-base mb-4">{isSignIn ? "Sign in to access your own work and engage with other people with your same passion " : "Sign up to get started with our amazing features and services."}</p>
              <ul className="list-disc list-inside space-y-2 text-left">
                <li>Create your own portfolio</li>
                <li>Personalize your dashboard</li>
                <li>Connect with others that have the same passion</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GuestApp;

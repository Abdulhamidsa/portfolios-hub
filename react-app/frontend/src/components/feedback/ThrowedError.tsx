import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface GeneralErrorProps {
  message?: string;
  returnPath?: string;
  returnText?: string;
}

export default function ThrowedError({ message = "We're sorry, but something went wrong.", returnPath = "/", returnText = "Return to Home" }: GeneralErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-2xl font-bold">Oops!</CardTitle>
          </div>
          <CardDescription className="mt-2">{message}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <a href={returnPath}>{returnText}</a>
          </Button>
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

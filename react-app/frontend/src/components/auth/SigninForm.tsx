import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useSignIn } from "@/hooks/useAuth";
import { signInSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

export type FormData = z.infer<typeof signInSchema>;

export default function SigninForm() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(signInSchema) });
  const signIn = useSignIn();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    const response = await signIn({ email: data.email, password: data.password });
    if (response.result) {
      toast({
        title: "Success",
        variant: "default",
        description: response.message,
        duration: 1500,
      });
      setTimeout(() => {
        login();
      }, 1500);
    } else {
      toast({
        title: "Error",
        description: response.message,
        // variant: "destructive",
        duration: 2000,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="border-0 shadow-none w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Signin</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input className="border-black/25" defaultValue="Silas_Tromp98@yahoo.com" type="email" placeholder="Email" {...register("email")} aria-invalid={errors.email ? "true" : "false"} />
            {/* {errors.email && (
              <p className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )} */}
          </div>
          <div className="space-y-2">
            <Input className="border-black/25" defaultValue="5zUG9yR84c4B8iU" type="password" placeholder="Password" {...register("password")} aria-invalid={errors.password ? "true" : "false"} />
            {/* {errors.password && (
              <p className="text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )} */}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

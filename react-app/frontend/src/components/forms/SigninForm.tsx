import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type FormData = z.infer<typeof schema>;
type ApiResponse = {
  success: boolean;
  message: string;
};
export default function SigninForm() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const signIn = useSignIn();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await signIn({ email: data.email, password: data.password });
    console.log(response);
    if (response.result) {
      setApiResponse({ success: true, message: response.message });
    } else {
      setApiResponse({ success: false, message: response.message });
    }
  };
  return (
    <Card className=" border-0 shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="">Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className=" space-y-4">
          <div className="space-y-2">
            <Input defaultValue="Anahi.Bogisich@gmail.com" type="email" placeholder="Email" {...register("email")} className="border-black" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Input defaultValue="6LnQ9ZA7ef3awpq" type="password" placeholder="Password" {...register("password")} className="border-black" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          {apiResponse && <p className={`mt-4 text-sm ${apiResponse.success ? "text-green-500" : "text-red-500"}`}>{apiResponse.message}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

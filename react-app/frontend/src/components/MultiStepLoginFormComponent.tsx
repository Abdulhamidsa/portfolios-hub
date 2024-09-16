import { apiRequest } from "../../services/api";
import { endPoints } from "../confige/api.config.ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

type FormData = {
  mobile: string;
  password: string;
  confirmPassword: string;
};
type ApiResponse = {
  success: boolean;
  message: string;
};

export default function MultiStepLoginFormComponent() {
  const [step, setStep] = useState(1);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  useSWR("signin", apiRequest, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (data.password !== data.confirmPassword) {
        setApiResponse({ success: false, message: "Passwords do not match." });
        return;
      }

      try {
        const response = await apiRequest(endPoints.auth.login, "POST", {
          mobile: data.mobile,
          password: data.password,
        });
        setApiResponse({ success: true, message: response.message || "Login successful!" });
        navigate("/homepage");
      } catch (error) {
        console.error("Login error:", error);
        setApiResponse({ success: false, message: "Login failed. Please try again." });
      }
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Step {step} of 3</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          {step === 1 && (
            <div className="space-y-2">
              <Input type="text" placeholder="Mobile" {...register("mobile", { required: "Mobile is required" })} />
              {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <Input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          )}
          {apiResponse && <p className={`mt-4 text-sm ${apiResponse.success ? "text-green-500" : "text-red-500"}`}>{apiResponse.message}</p>}
        </CardContent>
        <CardFooter>
          {step > 1 && (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button type="submit" className="ml-auto">
            {step === 3 ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

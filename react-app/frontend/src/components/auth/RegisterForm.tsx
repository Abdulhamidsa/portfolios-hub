import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { endPoints } from "@/config/apiEndpoints";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const userConfig = {
  predefinedProfessions: ["Developer", "Designer", "Manager", "Other"],
  predefinedLinks: ["GitHub", "LinkedIn", "Twitter", "Portfolio"],
};
type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  dateOfBirth: Date;
  password: string;
  profilePicture: string;
  bio: string;
  profession: string;
  country: string;
  links: { name: string; url: string }[];
};
const signupApi = async (data: FormData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(endPoints.auth.register, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Signup failed");
    }

    return { success: true, message: result.message || "Signup successful!" };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
};

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const watchAllFields = watch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        const response = await signupApi(data);
        if (response.success) {
          Toast({
            title: "Signup Successful",
            duration: 5000,
          });
          console.log("Signup successful");
        } else {
          Toast({
            title: "Signup Failed",
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch (error) {
        Toast({
          title: "Error" + (error instanceof Error ? `: ${error.message}` : ""),
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input placeholder="First Name" {...register("firstName", { required: "First name is required" })} />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
              </div>
              <div>
                <Input placeholder="Last Name" {...register("lastName", { required: "Last name is required" })} />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>
            <Input placeholder="Username" {...register("username", { required: "Username is required" })} />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
            <Input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            <Input placeholder="Mobile" {...register("mobile", { required: "Mobile number is required" })} />
            {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
            <Input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input placeholder="Profile Picture URL" {...register("profilePicture")} />
            <Textarea placeholder="Bio" {...register("bio")} />
            <Controller
              name="profession"
              control={control}
              rules={{ required: "Profession is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {userConfig.predefinedProfessions.map((profession) => (
                      <SelectItem key={profession} value={profession}>
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.profession && <p className="text-sm text-red-500">{errors.profession.message}</p>}
            <Input placeholder="Country" {...register("country", { required: "Country is required" })} />
            {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
            {userConfig.predefinedLinks.map((link, index) => (
              <div key={link} className="grid grid-cols-2 gap-2">
                <Input placeholder={`${link} URL`} {...register(`links.${index}.url` as const)} />
                <Input value={link} readOnly {...register(`links.${index}.name` as const)} />
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Confirm Your Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">First Name:</p>
                <p>{watchAllFields.firstName}</p>
              </div>
              <div>
                <p className="font-semibold">Last Name:</p>
                <p>{watchAllFields.lastName}</p>
              </div>
              <div>
                <p className="font-semibold">Username:</p>
                <p>{watchAllFields.username}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{watchAllFields.email}</p>
              </div>
              <div>
                <p className="font-semibold">Mobile:</p>
                <p>{watchAllFields.mobile}</p>
              </div>
              <div>
                <p className="font-semibold">Date of Birth:</p>
                <p>{watchAllFields.dateOfBirth ? format(watchAllFields.dateOfBirth, "PPP") : "Not set"}</p>
              </div>
              <div>
                <p className="font-semibold">Profession:</p>
                <p>{watchAllFields.profession}</p>
              </div>
              <div>
                <p className="font-semibold">Country:</p>
                <p>{watchAllFields.country}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Bio:</p>
              <p>{watchAllFields.bio}</p>
            </div>
            <div>
              <p className="font-semibold">Links:</p>
              <ul>
                {watchAllFields.links?.map((link, index) => (
                  <li key={index}>
                    {link.name}: {link.url}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl border-0 shadow-none">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Step {step} of 3</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>{renderStepContent()}</CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={isSubmitting}>
              Back
            </Button>
          )}
          <Button type="submit" className={step === 1 ? "ml-auto" : ""} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : step === 3 ? (
              "Submit"
            ) : (
              "Next"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

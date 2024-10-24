import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { preDefinedData } from "@/config/data";
import { useToast } from "@/hooks/use-toast";
import { useSignUp } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ReactSelect from "react-select";

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

export default function SignUpForm({ setIsSignIn }: { setIsSignIn: (value: boolean) => void }) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUp = useSignUp();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const watchAllFields = watch();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        const response = await signUp(data);
        if (response.result) {
          toast({
            title: "Success",
            description: response.message,
            duration: 3000,
          });
          setTimeout(() => {
            setIsSignIn(true);
          }, 1500);
          console.log(data);
        } else {
          toast({
            title: "Error",
            description: response.message,
            duration: 5000,
          });
        }
      } catch (error) {
        toast({
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
            <Input type="password" autoComplete="true" placeholder="Password" {...register("password", { required: "Password is required" })} />
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
                    {preDefinedData.professions.map((profession) => (
                      <SelectItem key={profession} value={profession}>
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.profession && <p className="text-sm text-red-500">{errors.profession.message}</p>}
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={preDefinedData.countries.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                  placeholder="Select a country"
                  onChange={(selectedOption) => field.onChange(selectedOption?.value)} // Pass only the value (string)
                  value={preDefinedData.countries.find((option) => option.value === field.value) || null} // Set the correct value
                />
              )}
            />
            {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
            {preDefinedData.links.map((link, index) => (
              <div key={link} className="grid grid-cols-2 gap-2">
                <Input placeholder={`${link} URL`} {...register(`links.${index}.url`)} />
                <Input value={link} readOnly {...register(`links.${index}.name`)} />
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
                <p className="font-semibold">Profession:</p>
                <p>{watchAllFields.profession}</p>
              </div>
              <div>
                <p className="font-semibold">Country:</p>
                <p>{watchAllFields.country?.label || watchAllFields.country}</p>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : step < 3 ? "Next" : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

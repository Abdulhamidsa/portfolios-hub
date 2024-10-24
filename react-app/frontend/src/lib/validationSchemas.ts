import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const projectUploadSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title cannot be empty"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, "Description must be at least 10 characters"),
  projectUrl: z
    .string()
    .url({
      message: "Project URL must be a valid URL",
    })
    .optional(),
  projectImage: z
    .array(z.string({ required_error: "image required" }), {
      required_error: "Project images are required",
    })
    .optional(),
  projectThumbnail: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  // mobile: z.string().optional(),
  // dateOfBirth: z.date().optional(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  profilePicture: z.string().url("Must be a valid URL").optional(),
  bio: z.string().optional(),
  profession: z.string().min(1, "Profession is required"),
  country: z.string().min(1, "Country is required"),
  links: z
    .array(
      z.object({
        name: z.string().min(1, "Link name is required"),
        url: z.string().url("Must be a valid URL").optional(),
      })
    )
    .optional(),
});

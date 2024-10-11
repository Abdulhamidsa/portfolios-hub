import { z } from 'zod'
// upload project schema validation
export const projectUploadSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
        })
        .min(1, 'Title cannot be empty'),
    description: z
        .string({
            required_error: 'Description is required',
        })
        .min(10, 'Description must be at least 10 characters'),
    projectUrl: z
        .string()
        .url({
            message: 'Project URL must be a valid URL',
        })
        .optional(),
    projectImage: z
        .array(z.string({ required_error: 'image required' }), {
            required_error: 'Project images are required',
        })
        .optional(),
    projectThumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
})
// fetch project schema validation
export const projectFetchSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    projectUrl: z.string().url().optional(),
    projectImage: z.array(z.string()).optional(),
    projectThumbnail: z.string().optional(),
    likes: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
})
// sign up schema validation
export const signInSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})

// project id schema validation
export const queryParamsValidator = z.object({
    projectId: z.string({
        required_error: 'Project id is required',
    }),
})

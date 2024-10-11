'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"

const projectUploadSchema = z.object({
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
  projectUrl: z.string().url({
    message: 'Project URL must be a valid URL',
  }),
  projectImage: z
    .array(z.string({ required_error: 'image required' }), {
      required_error: 'Project images are required',
    })
    .optional(),
  projectThumbnail: z.string().optional(),
  tags: z.array(z.string()),
})

type ProjectUploadSchema = z.infer<typeof projectUploadSchema>

export function ProjectUploadFormComponent() {
  const [tags, setTags] = useState<string[]>([])

  const form = useForm<ProjectUploadSchema>({
    resolver: zodResolver(projectUploadSchema),
    defaultValues: {
      title: '',
      description: '',
      projectUrl: '',
      projectImage: [],
      projectThumbnail: '',
      tags: [],
    },
  })

  const onSubmit = (data: ProjectUploadSchema) => {
    console.log(data)
    // Here you would typically send the data to your server
  }

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      event.preventDefault()
      const newTag = event.currentTarget.value.trim()
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag]
        setTags(updatedTags)
        form.setValue('tags', updatedTags, { shouldValidate: true })
      }
      event.currentTarget.value = ''
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    form.setValue('tags', updatedTags, { shouldValidate: true })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Images</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        field.onChange(files.map(file => URL.createObjectURL(file)))
                      }}
                    />
                  </FormControl>
                  <FormDescription>Upload one or more project images</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectThumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Thumbnail</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(URL.createObjectURL(file))
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>Upload a thumbnail for your project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder="Add tags (press Enter)"
                        onKeyDown={handleAddTag}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 text-primary-foreground hover:text-red-500 focus:outline-none"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Add relevant tags for your project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Upload Project</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
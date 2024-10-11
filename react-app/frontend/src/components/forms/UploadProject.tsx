import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import * as z from "zod";

const projectUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  projectUrl: z.string().url("Project URL must be a valid URL"),
  projectImages: z.array(z.instanceof(File)).optional(),
  projectThumbnail: z.instanceof(File).optional(),
  tags: z.array(z.string()),
});

type ProjectUploadSchema = z.infer<typeof projectUploadSchema>;

async function uploadProject(url: string, { arg }: { arg: FormData }) {
  const response = await fetch(url, {
    method: "POST",
    body: arg,
  });
  if (!response.ok) {
    throw new Error("Failed to upload project");
  }
  return response.json();
}

export default function ProjectUploadForm() {
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<ProjectUploadSchema>({
    resolver: zodResolver(projectUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      projectUrl: "",
      tags: [],
    },
  });

  const { trigger, isMutating, error } = useSWRMutation("http://localhost:4000/000000/projects/upload", uploadProject);

  const onSubmit = async (data: ProjectUploadSchema) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("projectUrl", data.projectUrl);

    try {
      const result = await trigger(formData);
      console.log("Upload successful:", result);
      form.reset();
      setTags([]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        form.setValue("tags", updatedTags, { shouldValidate: true });
      }
      event.currentTarget.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags, { shouldValidate: true });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Upload Your Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} className="w-full p-2" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project description" {...field} className="w-full p-2 min-h-[100px]" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Project URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com" {...field} className="w-full p-2" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Project Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        field.onChange(files);
                      }}
                      className="w-full p-2"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">Upload one or more project images</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectThumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Project Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                      className="w-full p-2"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">Upload a thumbnail for your project</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Tags</FormLabel>
                  <FormControl>
                    <div>
                      <Input placeholder="Add tags (press Enter)" onKeyDown={handleAddTag} className="w-full p-2 mb-2" />
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 focus:outline-none" aria-label={`Remove ${tag} tag`}>
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">Add relevant tags for your project</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isMutating} className="w-full py-2 mt-4">
              {isMutating ? "Uploading..." : "Upload Project"}
            </Button>
            {error && <p className="text-red-500 text-center mt-2">{error.message}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

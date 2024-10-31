'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Briefcase, Globe, Link as LinkIcon, MapPin, Pencil, User, X } from 'lucide-react'

interface UserLink {
  name: string
  url: string
}

interface UserPersonalInfo {
  profilePicture: string
  bio: string
  profession: string
  country: string
  dateOfBirth: string
  gender: string
  links: UserLink[]
}

interface UserPreferences {
  emailNotifications: boolean
  language: string
}

interface User {
  _id: string
  friendlyId: string
  personalInfo: UserPersonalInfo
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

const mockUser: User = {
  _id: '60d5ecb74f3f7f001f2345e7',
  friendlyId: 'john_doe',
  personalInfo: {
    profilePicture: 'https://avatars.dicebear.com/api/bottts/john_doe.svg',
    bio: 'Passionate developer and tech enthusiast',
    profession: 'Software Engineer',
    country: 'United States',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    links: [
      { name: 'GitHub', url: 'https://github.com/johndoe' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      { name: 'Twitter', url: 'https://twitter.com/johndoe' },
    ],
  },
  preferences: {
    emailNotifications: true,
    language: 'en',
  },
  createdAt: new Date('2023-01-01T00:00:00.000Z'),
  updatedAt: new Date('2023-06-15T12:30:00.000Z'),
}

const basicInfoSchema = z.object({
  friendlyId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not exceed 160 characters.",
  }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date of birth must be in YYYY-MM-DD format.",
  }),
  gender: z.string().min(1, {
    message: "Please select a gender.",
  }),
})

const professionalInfoSchema = z.object({
  profession: z.string().min(2, {
    message: "Profession must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
})

const linkSchema = z.object({
  name: z.string().min(1, { message: "Link name is required." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
})

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  language: z.string().min(1, { message: "Please select a language." }),
})

export default function UserProfilePage() {
  const [user, setUser] = useState<User>(mockUser)
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      friendlyId: user.friendlyId,
      bio: user.personalInfo.bio,
      dateOfBirth: user.personalInfo.dateOfBirth,
      gender: user.personalInfo.gender,
    },
  })

  const professionalInfoForm = useForm<z.infer<typeof professionalInfoSchema>>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      profession: user.personalInfo.profession,
      country: user.personalInfo.country,
    },
  })

  const linkForm = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  })

  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: user.preferences.emailNotifications,
      language: user.preferences.language,
    },
  })

  function onSubmitBasicInfo(values: z.infer<typeof basicInfoSchema>) {
    setUser(prevUser => ({
      ...prevUser,
      friendlyId: values.friendlyId,
      personalInfo: {
        ...prevUser.personalInfo,
        bio: values.bio,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
      },
    }))
    setEditingSection(null)
    toast({
      title: "Basic info updated",
      description: "Your basic information has been successfully updated.",
    })
  }

  function onSubmitProfessionalInfo(values: z.infer<typeof professionalInfoSchema>) {
    setUser(prevUser => ({
      ...prevUser,
      personalInfo: {
        ...prevUser.personalInfo,
        profession: values.profession,
        country: values.country,
      },
    }))
    setEditingSection(null)
    toast({
      title: "Professional info updated",
      description: "Your professional information has been successfully updated.",
    })
  }

  function onSubmitLink(values: z.infer<typeof linkSchema>) {
    setUser(prevUser => ({
      ...prevUser,
      personalInfo: {
        ...prevUser.personalInfo,
        links: [...prevUser.personalInfo.links, values],
      },
    }))
    linkForm.reset()
    toast({
      title: "Link added",
      description: "Your new link has been successfully added.",
    })
  }

  function onSubmitPreferences(values: z.infer<typeof preferencesSchema>) {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        emailNotifications: values.emailNotifications,
        language: values.language,
      },
    }))
    setEditingSection(null)
    toast({
      title: "Preferences updated",
      description: "Your preferences have been successfully updated.",
    })
  }

  function removeLink(index: number) {
    setUser(prevUser => ({
      ...prevUser,
      personalInfo: {
        ...prevUser.personalInfo,
        links: prevUser.personalInfo.links.filter((_, i) => i !== index),
      },
    }))
    toast({
      title: "Link removed",
      description: "The link has been successfully removed.",
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-4 dark">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.personalInfo.profilePicture} alt={user.friendlyId} />
                <AvatarFallback>{user.friendlyId[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl">{user.friendlyId}</CardTitle>
                <CardDescription>{user.personalInfo.profession}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-center sm:text-left">{user.personalInfo.bio}</p>
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-muted-foreground">
            <MapPin size={16} />
            <span>{user.personalInfo.country}</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="professional-info">Professional Info</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </CardHeader>
            <CardContent>
              {editingSection === 'basic-info' ? (
                <Form {...basicInfoForm}>
                  <form onSubmit={basicInfoForm.handleSubmit(onSubmitBasicInfo)} className="space-y-4">
                    <FormField
                      control={basicInfoForm.control}
                      name="friendlyId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicInfoForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicInfoForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicInfoForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-2">
                  <div>
                    <Label>Username</Label>
                    <p className="text-sm text-muted-foreground">{user.friendlyId}</p>
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <p className="text-sm text-muted-foreground">{user.personalInfo.bio}</p>
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <p className="text-sm text-muted-foreground">{user.personalInfo.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <p className="text-sm text-muted-foreground">{user.personalInfo.gender}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {editingSection !== 'basic-info' && (
                <Button onClick={() => setEditingSection('basic-info')}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Basic Info
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="professional-info">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Your work-related details</CardDescription>
            </CardHeader>
            <CardContent>
              {editingSection === 'professional-info' ? (
                <Form {...professionalInfoForm}>
                  <form onSubmit={professionalInfoForm.handleSubmit(onSubmitProfessionalInfo)} className="space-y-4">
                    <FormField
                      control={professionalInfoForm.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profession</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={professionalInfoForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      
                      )}
                    />
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-2">
                  <div>
                    <Label>Profession</Label>
                    <p className="text-sm text-muted-foreground">{user.personalInfo.profession}</p>
                  </div>
                  <div>
                    <Label>Country</Label>
                    <p className="text-sm text-muted-foreground">{user.personalInfo.country}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {editingSection !== 'professional-info' && (
                <Button onClick={() => setEditingSection('professional-info')}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Professional Info
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
              <CardDescription>Your professional and social links</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {user.personalInfo.links.map((link, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="text-muted-foreground" size={16} />
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {link.name}
                      </a>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeLink(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <Form {...linkForm}>
                <form onSubmit={linkForm.handleSubmit(onSubmitLink)} className="space-y-4">
                  <FormField
                    control={linkForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., GitHub" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={linkForm.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add Link</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {editingSection === 'preferences' ? (
                <Form {...preferencesForm}>
                  <form onSubmit={preferencesForm.handleSubmit(onSubmitPreferences)} className="space-y-4">
                    <FormField
                      control={preferencesForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Receive email notifications about your account activity.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={preferencesForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Preferences</Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch
                      checked={user.preferences.emailNotifications}
                      onCheckedChange={() => {}}
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Language</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.preferences.language === 'en' ? 'English' :
                       user.preferences.language === 'es' ? 'Español' :
                       user.preferences.language === 'fr' ? 'Français' :
                       user.preferences.language === 'de' ? 'Deutsch' : 'Unknown'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {editingSection !== 'preferences' && (
                <Button onClick={() => setEditingSection('preferences')}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Preferences
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
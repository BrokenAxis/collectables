'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { usernameUpdateSchema, profilePictureUpdateSchema, emailUpdateSchema, passwordUpdateSchema, descriptionUpdateSchema } from '@/lib/validation/update-details'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

type FormData = z.infer<typeof usernameUpdateSchema> | z.infer<typeof profilePictureUpdateSchema> | z.infer<typeof descriptionUpdateSchema> | z.infer<typeof emailUpdateSchema> | z.infer<typeof passwordUpdateSchema>

export function UpdateUsernameForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(usernameUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const updateResult = await fetch('/api/auth/profile/update/username', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  
    setIsLoading(false)
  
    if (!updateResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: updateResult?.statusText,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="grid gap-4 w-fill">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label >Change Display Name</Label>

          <div className="flex w-full items-center space-x-2">
            <Input
              className="w-full justify-self-start"
              type="username"
              placeholder="This is your public display name."
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={isLoading}
              {...register('username')} />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </div>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
        </div>
      </div>
    </div>
  )
}

export function UpdateProfilePictureForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(profilePictureUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const updateResult = await fetch('/api/auth/profile/update/picture', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  
    setIsLoading(false)
  
    if (!updateResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: updateResult?.statusText,
        variant: 'destructive',
      })
    }
  }
  
  return (
    <div className="w-fill">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Change Display Picture</Label>
          <div className="grid gap-2.5 flex grid-flow-col">
            <Input
              id="picture"
              type="file"
              {...register('picture')} />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
              >
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export function UpdateDescriptionForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(descriptionUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const updateResult = await fetch('/api/auth/profile/update/picture', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  
    setIsLoading(false)
  
    if (!updateResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: updateResult?.statusText,
        variant: 'destructive',
      })
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself!"
                  className="resize-y w-full h-32"
                  {...field}
                  {...form.register('bio')}
                />
              </FormControl>
              <FormDescription>
                This is your public description. It will be visible to anyone who views your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          disabled={isLoading}
        >
          Update
        </Button>
      </form>
    </Form>
  )
}

export function UpdateEmailForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(emailUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const updateResult = await fetch('/api/auth/profile/update/email', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  
    setIsLoading(false)
  
    if (!updateResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: updateResult?.statusText,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="grid gap-4 w-fill">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label >Change Email Address</Label>

          <div className="flex w-full items-center space-x-2">
            <Input
              className="w-full justify-self-start"
              type="username"
              placeholder="goombas@gmail.com"
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={isLoading}
              {...register('username')} />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export function UpdatePasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(passwordUpdateSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const updateResult = await fetch('/api/auth/profile/update/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  
    setIsLoading(false)
  
    if (!updateResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: updateResult?.statusText,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="grid gap-4 w-fill">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label >Change Password</Label>

          <div className="flex w-full items-center space-x-2">
            <Input
              className="w-full justify-self-start"
              type="password"
              placeholder="new password"
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={isLoading}
              {...register('username')} />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
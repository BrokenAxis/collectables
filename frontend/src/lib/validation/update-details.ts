import * as z from 'zod'

export const usernameUpdateSchema = z.object({
  username: z.string()
})

export const profilePictureUpdateSchema = z.object({
  picture: z.string().url()
})

export const descriptionUpdateSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
  }),
})

export const emailUpdateSchema = z.object({
  email: z.string().email()
})

export const passwordUpdateSchema = z.object({
  password: z.string().min(8)
})
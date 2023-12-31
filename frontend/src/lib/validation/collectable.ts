import * as z from 'zod'

const MAX_IMAGE_SIZE = 500000 // 500kb
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'image/svg+xml',
]

export const createCollectableSchema = z.object({
  name: z.string().min(1),
  image: z
    .custom<File>(
      (val) => val instanceof File,
      'Required to import at least one image'
    )
    .refine(
      (file) => Number(file.size) <= Number(MAX_IMAGE_SIZE),
      `File size should be less than 50kb`
    )
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
      'Only these types are allowed .jpg, .jpeg, .png, .svg and .webp'
    ),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
})

export const updateProfileCollectionSchema = z.object({
  name: z.string(),
  count: z
    .string()
    .refine((val) => !isNaN(Number(val)), 'Count should be a number')
    .refine((val) => Number(val) > 0, 'Count should be greater than zero')
    .refine(
      (val) => Number.isInteger(Number(val)),
      'Count should be an integer'
    ),
})

export const addCollectableCollectionSchema = z.object({
  name: z.string(),
})

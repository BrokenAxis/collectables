'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createCollectableSchema } from '@/lib/validation/collectable'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Tag, TagInput } from '../tags'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

// image handling --------------------------------------------------------------

import Cropper, { Area } from 'react-easy-crop'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { profilePictureUpdateSchema } from '@/lib/validation/update-details'
import NextImage from 'next/image'
import { Label } from '@radix-ui/react-label'

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area | null
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx || !pixelCrop) {
    return null
  }

  const { x, y, width, height } = pixelCrop

  canvas.width = width
  canvas.height = height

  ctx.drawImage(image, x, y, width, height, 0, 0, width, height)

  return canvas.toDataURL('image/png')
}

// -----------------------------------------------------------------------------

type FormData = z.infer<typeof createCollectableSchema>

export function CreateCollectableForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const [imageAvailable, setImageAvailable] = React.useState<boolean>(false)
  const [image, setImage] = React.useState<string>('')
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  )
  const [zoom, setZoom] = React.useState(1)

  const [tags, setTags] = React.useState<Tag[]>([])

  const form = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(createCollectableSchema),
  })

  // image functions
  const { setValue } = form
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  async function onCropSubmit() {
    setIsLoading(true)

    const croppedImage = await getCroppedImg(image, croppedAreaPixels)
    setImage(croppedImage ?? '')

    setIsLoading(false)
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const createResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collectable`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(data),
      }
    )

    setIsLoading(false)

    if (!createResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: createResult?.statusText,
        variant: 'destructive',
      })
    }
    return toast({
      title: 'Success!',
      description: 'The collectable was successfully created!',
      variant: 'default',
    })
  }

  return (
    <div className="grid gap-6 w-fill">
      <Dialog>
        {image && (
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium leading-none">Preview</Label>
            <div className="container rounded-2xl border pt-3 pb-3 flex justify-center">
              <NextImage
                src={image}
                className="rounded-2xl"
                alt="Collection image"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="createCollectionForm"
          >
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collectable Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Pikachu" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Tags</FormLabel>
                    <FormControl>
                      <TagInput
                        {...field}
                        placeholder="Enter a tag"
                        tags={tags}
                        className="w-full"
                        setTags={(newTags) => {
                          setTags(newTags)
                          setValue('tags', newTags as [Tag, ...Tag[]])
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      These are the keywords that will be used to categorize
                      your new collectable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <>
                    <FormItem>
                      <FormLabel>Collectable Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={form?.formState?.isSubmitting}
                          onChange={(e) => {
                            if (e.target.files) {
                              onChange(e.target.files[0])
                            }
                            if (
                              e.target.files &&
                              profilePictureUpdateSchema.safeParse({
                                image: e.target.files[0],
                              }).success
                            ) {
                              const dataTransfer = new DataTransfer()
                              dataTransfer.items.add(e.target.files[0])
                              const file = URL.createObjectURL(
                                dataTransfer.files[0]
                              )
                              setImageAvailable(true)
                              setImage(file)
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose an image for your collectable.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
          </form>
        </Form>

        {imageAvailable ? (
          <DialogTrigger asChild>
            <Button
              type="submit"
              className="w-auto justify-self-start transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crop Image
            </Button>
          </DialogTrigger>
        ) : (
          <Button
            type="submit"
            className="w-auto justify-self-start transition-transform duration-300 transform active:translate-y-3"
          >
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Crop Image
          </Button>
        )}
        <Button
          type="submit"
          form="createCollectionForm"
          disabled={isLoading}
          className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
        >
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>

        <DialogContent className="max-w-[350px] sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
            <DialogDescription>Crop your collectable here!</DialogDescription>
          </DialogHeader>
          <div className="min-h-[350px] sm:min-h-[425px] relative border-2">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropComplete={onCropComplete}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={onCropSubmit}>
                {isLoading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

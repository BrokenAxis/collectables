import React from 'react'

//import { IconLogo } from '@/components/ui/assets/IconLogo'
import { GeneralNavBar } from '@/components/general-navbar'
import { TypographyH2 } from '@/components/typography-h2'

import { UpdateUsernameForm, UpdateProfilePictureForm, UpdateDescriptionForm, UpdateEmailForm, UpdatePasswordForm } from '@/components/profile-forms'
//import Link from 'next/link'

//import Image from 'next/image'

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Profile Settings" />
        </div>
      </section>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px]">
        <UpdateUsernameForm />
        <UpdateProfilePictureForm />
        <span className="w-full border-t" />
        <UpdateDescriptionForm />
      </div>

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Security Settings" />
        </div>
      </section>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px]">
        <UpdateEmailForm />
        <p className="text-sm text-muted-foreground">
          Email must not belong to an existing account.
        </p>
        <span className="w-full border-t" />
        <UpdatePasswordForm />
        <p className="text-sm text-muted-foreground">
          Currently doesn&apos;t require email confirmation.
        </p>
        <span className="w-full border-t" />
      </div>    
    </div>
  )
}
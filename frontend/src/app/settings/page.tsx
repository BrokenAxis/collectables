import React from 'react'

//import { IconLogo } from '@/components/ui/assets/IconLogo'
import { GeneralNavBar } from '@/components/general-navbar'
import { TypographyH2 } from '@/components/typography-h2'

import { UserAuthForm } from '@/components/profile-forms'
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

      <div className="mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[700px]">
        <UserAuthForm />
        <p className="text-sm text-muted-foreground">
              Change Profile Picture
        </p>
        <p className="text-sm text-muted-foreground">
              Edit Description
        </p>
      </div>

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Security Settings" />
        </div>
      </section>

      <div className="mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[350px]">
        <p className="text-sm text-muted-foreground">
              Reset Password
        </p>
        <p className="text-sm text-muted-foreground">
              Update Email Address
        </p>
      </div>

      
    
    </div>
  )
}
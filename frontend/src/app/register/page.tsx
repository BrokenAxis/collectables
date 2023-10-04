import React from 'react'

import { UserAuthForm } from '@/components/signup-form'
import { IconLogo } from '@/components/ui/assets/IconLogo'
import { BackButton } from '@/components/ui/button/back-button'
import Link from 'next/link'

import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid max-w-none lg:grid-cols-2 lg:px-0">
      <BackButton />
      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex items-center justify-center">
        <Image
          className="object-contain"
          src="/images/logic.svg"
          alt="Logic"
          width={500}
          height={500}
          priority={true}
        />
        <BackButton />
      </div>

      <div className="mx-auto flex flex-col justify-center space-y-3 w-[350px]">
        <div className="flex flex-col text-center">
          <IconLogo className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to start your journey!
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Have an account? Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

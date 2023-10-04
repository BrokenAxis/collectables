import { DefaultNavBar } from '@/components/welcome-nav-bar'
import { WelcomePage } from '@/components/welcome-page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DefaultNavBar />
      <WelcomePage />
    </div>
  )
}

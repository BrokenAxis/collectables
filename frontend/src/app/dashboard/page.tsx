import * as React from 'react'

import { DashboardNavBar } from '@/components/dashboard-navbar'
import { TypographyH2 } from '@/components/typography-h2'

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavBar />
      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Active Campaigns" />
        </div>
      </section>

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Recommended For You" />
        </div>
      </section>

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Popular Collections" />
        </div>
      </section>

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Popular Collectibles" />
        </div>
      </section>
    </div>
  )
}

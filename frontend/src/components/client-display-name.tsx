'use client'

import { useProfileStore, updateProfile } from '@/store/profile'

export function DisplayName() {
  updateProfile()
  const name = useProfileStore((state) => state.name)
  console.log(name)
  return (
    <div>
      <p className="text-2xl font-bold">Welcome back, {name}!</p>
    </div>
  )
}

'use client'

import { create } from 'zustand'

export interface ProfileState {
  name: string
  image: string
  description: string

  updateProfile: (name: string, image: string, description: string) => void
}

export const useProfileStore = create<ProfileState>()((set) => ({
  name: '',
  image: '',
  description: '',

  updateProfile: (name: string, image: string, description: string) =>
    set(() => ({
      name: name,
      image: image,
      description: description,
    })),
}))

export const updateProfile = async () => {
  const response = await fetch('/api/profile/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    const profile = await response.json()
    console.log('profile updated: ' + JSON.stringify(profile))

    // update profile here
  } else {
    console.error('profile failed to update: ' + response.statusText)
  }
}

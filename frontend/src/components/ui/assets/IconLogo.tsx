'use client'

import React from 'react'
import { LucideProps } from 'lucide-react'
import { useTheme } from 'next-themes'

export function IconLogo(props: LucideProps) {
  const { theme } = useTheme()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 16 16"
      {...props}
    >
      <g>
        <path
          fill={theme === 'dark' ? '#fff' : '#000'}
          d="M8,0C3.589,0,0,3.589,0,8v2.25C0,11.215,0.785,12,1.75,12H2v1.25C2,14.767,3.233,16,4.75,16h3.5C8.664,16,9,15.664,9,15.25   S8.664,14.5,8.25,14.5h-3.5c-0.689,0-1.25-0.561-1.25-1.25V12H5v0.25C5,12.664,5.336,13,5.75,13s0.75-0.336,0.75-0.75V12h3v0.25   c0,0.414,0.336,0.75,0.75,0.75S11,12.664,11,12.25V12h1.5v1.25c0,0.689-0.561,1.25-1.25,1.25H11c-0.414,0-0.75,0.336-0.75,0.75   S10.586,16,11,16h0.25c1.516,0,2.75-1.233,2.75-2.75V12h0.25c0.965,0,1.75-0.785,1.75-1.75V8C16,3.589,12.411,0,8,0z M10.664,2.077   C10.432,2.333,10.11,2.5,9.75,2.5c-0.591,0-1.064-0.42-1.194-0.972C9.302,1.592,10.01,1.782,10.664,2.077z M2.25,5   C2.939,5,3.5,5.561,3.5,6.25S2.939,7.5,2.25,7.5c-0.258,0-0.494-0.104-0.703-0.252C1.64,6.445,1.88,5.688,2.239,5.001   C2.243,5.001,2.246,5,2.25,5z M1.5,10.25V8.881C1.743,8.951,1.993,9,2.25,9C3.766,9,5,7.767,5,6.25   c0-1.193-0.769-2.201-1.833-2.581c0.987-1.1,2.339-1.86,3.866-2.089C7.199,2.939,8.347,4,9.75,4c0.896,0,1.71-0.442,2.218-1.137   c1.311,1.015,2.221,2.515,2.462,4.232C14.209,7.038,13.983,7,13.75,7C12.233,7,11,8.233,11,9.75c0,0.258,0.049,0.507,0.119,0.75   H1.75C1.612,10.5,1.5,10.388,1.5,10.25z M14.25,10.5h-1.492c-0.165-0.213-0.258-0.475-0.258-0.75c0-0.689,0.561-1.25,1.25-1.25   c0.275,0,0.537,0.093,0.75,0.258v1.492C14.5,10.388,14.388,10.5,14.25,10.5z"
        />
        <path
          fill={theme === 'dark' ? '#fff' : '#000'}
          d="M8,5C6.897,5,6,5.897,6,7s0.897,2,2,2s2-0.897,2-2S9.103,5,8,5z M8,7.5C7.724,7.5,7.5,7.276,7.5,7S7.724,6.5,8,6.5   S8.5,6.724,8.5,7S8.276,7.5,8,7.5z"
        />
      </g>
    </svg>
  )
}
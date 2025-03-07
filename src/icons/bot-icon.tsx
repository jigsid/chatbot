import React from 'react'
import { cn } from '@/lib/utils'

interface BotIconProps {
  className?: string
}

export const BotIcon = ({ className }: BotIconProps) => {
  return (
    <svg
      className={className}
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Robot head */}
      <rect
        x="10"
        y="8"
        width="27"
        height="24"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Robot eyes */}
      <circle
        cx="18"
        cy="18"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="29"
        cy="18"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Robot mouth/smile */}
      <path
        d="M17 26h13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Antenna */}
      <path
        d="M23.5 8V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="23.5"
        cy="3"
        r="1"
        fill="currentColor"
      />
      
      {/* Connection to chat bubble */}
      <path
        d="M23.5 32v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Chat bubble */}
      <path
        d="M16 35h15l4 5v-5h2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3H10a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

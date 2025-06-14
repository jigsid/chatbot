import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const Responding = () => {
  return (
    <div className="flex gap-1.5 items-end animate-in slide-in-from-bottom-2 duration-200 self-start pl-0.5">
      <div className="relative w-4 h-4 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md shadow-sm"></div>
        <div className="absolute inset-[0.5px] bg-white rounded-[3px] flex items-center justify-center">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500"
          >
            <rect x="5" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 16V19" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 19H16" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10L5 8M3 14L5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21 10L19 8M21 14L19 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="chat-bubble" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
        <div className="typing" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6', margin: '0 2px', animation: 'typing 1.5s infinite ease-in-out' }}></div>
          <div className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6', margin: '0 2px', animation: 'typing 1.5s infinite ease-in-out 0.5s' }}></div>
          <div className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6', margin: '0 2px', animation: 'typing 1.5s infinite ease-in-out 1s' }}></div>
        </div>
      </div>
    </div>
  )
}

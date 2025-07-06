import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  size: 'max' | 'min'
  label: string
  icon: JSX.Element
  path?: string
  current?: string
  onSignOut?(): void
}

const MenuItem = ({ size, path, icon, label, current, onSignOut }: Props) => {
  // Check if this is the Voice Assistant menu item
  const isVoiceAssistant = path === 'settings/voice-assistant';
  
  switch (size) {
    case 'max':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
            !current
              ? 'text-white hover:bg-magenta/10 hover:text-magenta'
              : current == path
              ? 'bg-magenta font-medium text-white shadow-sm'
              : 'text-white hover:bg-magenta/10 hover:text-magenta',
            // Add special class for Voice Assistant
            isVoiceAssistant ? 'voice-assistant-item' : ''
          )}
          href={path ? `/${path}` : '#'}
          style={isVoiceAssistant ? { height: '40px', position: 'relative' } : {}}
          data-voice-assistant={isVoiceAssistant ? 'true' : 'false'}
        >
          <div className="w-5 h-5 flex-shrink-0">
            {icon}
          </div>
          <span className="text-sm whitespace-nowrap">{label}</span>
        </Link>
      )
    case 'min':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center justify-center p-2 rounded-lg transition-colors',
            !current
              ? 'text-white hover:bg-magenta/10 hover:text-magenta'
              : current == path
              ? 'bg-magenta font-medium text-white shadow-sm'
              : 'text-white hover:bg-magenta/10 hover:text-magenta',
            // Add special class for Voice Assistant
            isVoiceAssistant ? 'voice-assistant-item' : ''
          )}
          href={path ? `/${path}` : '#'}
          style={isVoiceAssistant ? { height: '40px', position: 'relative' } : {}}
          data-voice-assistant={isVoiceAssistant ? 'true' : 'false'}
        >
          <div className="w-5 h-5 flex-shrink-0">
            {icon}
          </div>
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem

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
  switch (size) {
    case 'max':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
            !current
              ? 'text-gray-600 hover:bg-white hover:text-gray-900'
              : current == path
              ? 'bg-white font-medium text-gray-900 shadow-sm'
              : 'text-gray-600 hover:bg-white hover:text-gray-900'
          )}
          href={path ? `/${path}` : '#'}
        >
          <div className="w-5 h-5">
            {icon}
          </div>
          <span className="text-sm">{label}</span>
        </Link>
      )
    case 'min':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center justify-center p-2 rounded-lg transition-colors',
            !current
              ? 'text-gray-600 hover:bg-white hover:text-gray-900'
              : current == path
              ? 'bg-white font-medium text-gray-900 shadow-sm'
              : 'text-gray-600 hover:bg-white hover:text-gray-900'
          )}
          href={path ? `/${path}` : '#'}
        >
          <div className="w-5 h-5">
            {icon}
          </div>
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem

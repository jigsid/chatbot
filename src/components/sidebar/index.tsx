'use client'
import useSideBar from '@/context/use-sidebar'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import MaxMenu from './maximized-menu'
import { MinMenu } from './minimized-menu'

type Props = {
  domains:
    | {
        id: string
        name: string
        icon: string
      }[]
    | null
    | undefined
}

const SideBar = ({ domains }: Props) => {
  const { expand, onExpand, page, onSignOut } = useSideBar()
  const [isHovered, setIsHovered] = useState(false)

  // Use either the context expand state or hover state
  const isExpanded = isHovered || expand

  return (
    <div
      className={cn(
        'bg-black text-white h-full fixed left-0 top-0 z-20 border-r border-magenta/30 flex flex-col transition-all duration-300 ease-in-out overflow-hidden',
        isExpanded ? 'w-[240px]' : 'w-[60px]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Both menus are always rendered, but positioned absolutely */}
      <div className="relative w-full h-full">
        {/* Maximized menu */}
        <div 
          className={cn(
            'absolute top-0 left-0 w-full h-full transition-all duration-300',
            isExpanded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-full pointer-events-none'
          )}
        >
          <MaxMenu
            domains={domains}
            current={page!}
            onExpand={onExpand}
            onSignOut={onSignOut}
          />
        </div>
        
        {/* Minimized menu */}
        <div 
          className={cn(
            'absolute top-0 left-0 w-full h-full transition-all duration-300',
            isExpanded 
              ? 'opacity-0 translate-x-full pointer-events-none' 
              : 'opacity-100 translate-x-0'
          )}
        >
          <MinMenu
            domains={domains}
            onShrink={onExpand}
            current={page!}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  )
}

export default SideBar

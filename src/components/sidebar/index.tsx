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
        'bg-black text-white h-full fixed left-0 top-0 z-20 border-r border-magenta/30 flex flex-col transition-width duration-300 ease-in-out',
        isExpanded ? 'w-[240px]' : 'w-[60px]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isExpanded ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          onShrink={onExpand}
          current={page!}
          onSignOut={onSignOut}
        />
      )}
    </div>
  )
}

export default SideBar

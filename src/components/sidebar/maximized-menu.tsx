import { SIDE_BAR_MENU } from '@/constants/menu'
import { LogOut, Menu, MonitorSmartphone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import DomainMenu from './domain-menu'
import MenuItem from './menu-item'
import Link from 'next/link'
type Props = {
  onExpand(): void
  current: string
  onSignOut(): void
  domains:
    | {
        id: string
        name: string
        icon: string | null
      }[]
    | null
    | undefined
}

const MaxMenu = ({ current, domains, onExpand, onSignOut }: Props) => {
  return (
    <div className="px-4 flex flex-col h-full">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-magenta rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-magenta/20">
            SR
          </div>
          <Link href="/">
            <span className="text-lg font-semibold text-white">
              Smart<span className="text-magenta">Rep</span>
            </span>
          </Link>
        </div>
        <Menu
          className="cursor-pointer text-white hover:text-magenta transition-colors w-5 h-5"
          onClick={onExpand}
        />
      </div>
      <div className="flex flex-col justify-between h-full pt-4">
        <div className="flex flex-col justify-start">
          <p className="text-xs font-medium text-magenta mb-2 px-3">MENU</p>
          <div className="menu-items-container">
            {SIDE_BAR_MENU.map((menu, key) => (
              <div 
                key={key} 
                className="menu-item-wrapper"
              >
                <MenuItem
                  size="max"
                  {...menu}
                  current={current}
                />
              </div>
            ))}
          </div>
          <DomainMenu domains={domains} />
        </div>
        <div className="flex flex-col pb-4">
          <p className="text-xs font-medium text-magenta mb-2 px-3">OPTIONS</p>
          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut className="w-5 h-5" />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="max"
            label="Mobile App"
            icon={<MonitorSmartphone className="w-5 h-5" />}
          />
        </div>
      </div>
    </div>
  )
}

export default MaxMenu

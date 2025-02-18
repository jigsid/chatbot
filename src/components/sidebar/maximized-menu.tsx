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
          <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">
            SR
          </div>
          <Link href="/">
            <span className="text-lg font-semibold text-gray-900">
              Smart<span className="text-violet-500">Rep</span> AI
            </span>
          </Link>
        </div>
        <Menu
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors w-5 h-5"
          onClick={onExpand}
        />
      </div>
      <div className="flex flex-col justify-between h-full pt-4">
        <div className="flex flex-col justify-start">
          <p className="text-xs font-medium text-gray-500 mb-2 px-3">MENU</p>
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size="max"
              {...menu}
              key={key}
              current={current}
            />
          ))}
          <DomainMenu domains={domains} />
        </div>
        <div className="flex flex-col pb-4">
          <p className="text-xs font-medium text-gray-500 mb-2 px-3">OPTIONS</p>
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

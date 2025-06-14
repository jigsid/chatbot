import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type Props = {
  triggers: {
    label: string
    icon?: JSX.Element
  }[]
  children: React.ReactNode
  className?: string
  button?: JSX.Element
}

const TabsMenu = ({ triggers, children, className, button }: Props) => {
  return (
    <Tabs
      defaultValue={triggers[0].label}
      className="w-full h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <TabsList className={cn('pr-5 bg-slate-100 dark:bg-slate-800', className)}>
          {triggers.map((trigger, key) => (
            <TabsTrigger
              key={key}
              value={trigger.label}
              className="capitalize flex gap-2 font-semibold text-slate-700 data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              {trigger.icon && trigger.icon}
              {trigger.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {button && <div className="ml-auto">{button}</div>}
      </div>
      <div className="w-full flex-1 overflow-hidden">
        {children}
      </div>
    </Tabs>
  )
}

export default TabsMenu

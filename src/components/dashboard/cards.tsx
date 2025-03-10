import React from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  title: string
  value: number
  icon: JSX.Element
  sales?: boolean
  trend?: 'up' | 'down' | 'neutral'
  percentage?: number
}

const DashboardCard = ({ icon, title, value, sales, trend = 'up', percentage = 0 }: Props) => {
  return (
    <div className="rounded-xl flex flex-col gap-4 p-6 bg-white dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 md:w-fit w-full group overflow-hidden relative">
      <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gray-100/50 dark:bg-neutral-700/20 group-hover:scale-110 transition-transform duration-300"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300">
            {icon}
          </div>
          <h2 className="font-medium text-gray-600 dark:text-gray-300">{title}</h2>
        </div>
        
        {percentage > 0 && (
          <div className={cn(
            "text-xs font-medium flex items-center gap-1 rounded-full px-2 py-1",
            trend === 'up' ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400" :
            trend === 'down' ? "text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400" :
            "text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-400"
          )}>
            {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
            {trend === 'down' && <ArrowUpRight className="w-3 h-3 rotate-90" />}
            {percentage}%
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <p className="font-bold text-3xl text-gray-900 dark:text-white group-hover:scale-105 origin-left transition-transform duration-300">
          {sales && '$'}
          {value.toLocaleString()}
        </p>
        
        <div className="h-10 w-16 flex items-end justify-center">
          {trend === 'up' && (
            <div className="flex items-end gap-[2px]">
              <div className="w-1 h-3 bg-emerald-200 dark:bg-emerald-900/50 rounded-t"></div>
              <div className="w-1 h-4 bg-emerald-300 dark:bg-emerald-800/50 rounded-t"></div>
              <div className="w-1 h-6 bg-emerald-400 dark:bg-emerald-700/50 rounded-t"></div>
              <div className="w-1 h-8 bg-emerald-500 dark:bg-emerald-600/50 rounded-t"></div>
            </div>
          )}
          
          {trend === 'down' && (
            <div className="flex items-end gap-[2px]">
              <div className="w-1 h-8 bg-red-500 dark:bg-red-600/50 rounded-t"></div>
              <div className="w-1 h-6 bg-red-400 dark:bg-red-700/50 rounded-t"></div>
              <div className="w-1 h-4 bg-red-300 dark:bg-red-800/50 rounded-t"></div>
              <div className="w-1 h-3 bg-red-200 dark:bg-red-900/50 rounded-t"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard

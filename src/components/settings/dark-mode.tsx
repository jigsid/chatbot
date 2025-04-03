'use client'
import { useThemeMode } from '@/hooks/settings/use-settings'
import React from 'react'
import Section from '../section-label'
import { cn } from '@/lib/utils'
import { SystemMode } from '../themes-placeholder/systemmode'
import { LightMode } from '../themes-placeholder/lightmode'
import { DarkMode } from '../themes-placeholder/darkmode'
import { Moon, Sun, Computer } from 'lucide-react'

type Props = {}

const DarkModetoggle = (props: Props) => {
  const { setTheme, theme } = useThemeMode()

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose how SmartRep AI looks to you. Select a theme preference.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className={cn(
            'relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300',
            theme === 'system' 
              ? 'border-violet-500 shadow-md shadow-violet-200 dark:shadow-violet-900/20' 
              : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700'
          )}
          onClick={() => setTheme('system')}
        >
          <div className="aspect-video bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
            <SystemMode />
          </div>
          <div className="p-3 flex items-center justify-between bg-white dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
            <Computer className={cn(
              "w-4 h-4",
              theme === 'system' ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
            )} />
          </div>
          {theme === 'system' && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500"></div>
          )}
        </div>
        
        <div
          className={cn(
            'relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300',
            theme === 'light' 
              ? 'border-violet-500 shadow-md shadow-violet-200 dark:shadow-violet-900/20' 
              : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700'
          )}
          onClick={() => setTheme('light')}
        >
          <div className="aspect-video bg-gradient-to-b from-gray-100 to-white">
            <LightMode />
          </div>
          <div className="p-3 flex items-center justify-between bg-white">
            <span className="text-sm font-medium text-gray-900">Light</span>
            <Sun className={cn(
              "w-4 h-4",
              theme === 'light' ? 'text-violet-500' : 'text-gray-400'
            )} />
          </div>
          {theme === 'light' && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500"></div>
          )}
        </div>
        
        <div
          className={cn(
            'relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300',
            theme === 'dark' 
              ? 'border-violet-500 shadow-md shadow-violet-200 dark:shadow-violet-900/20' 
              : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700'
          )}
          onClick={() => setTheme('dark')}
        >
          <div className="aspect-video bg-gradient-to-b from-gray-800 to-gray-900">
            <DarkMode />
          </div>
          <div className="p-3 flex items-center justify-between bg-gray-800">
            <span className="text-sm font-medium text-white">Dark</span>
            <Moon className={cn(
              "w-4 h-4",
              theme === 'dark' ? 'text-violet-500' : 'text-gray-500'
            )} />
          </div>
          {theme === 'dark' && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500"></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DarkModetoggle

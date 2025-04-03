import { onGetAllAccountDomains } from '@/actions/settings'
import InfoBar from '@/components/infobar'
import { Globe, Settings as SettingsIcon, ArrowRight, Moon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import DarkModetoggle from '@/components/settings/dark-mode'

interface Domain {
  id: string;
  name: string;
  icon: string;
  customer?: any[];
}

type Props = {};

const SettingsPage = async (props: Props) => {
  const domainsData = await onGetAllAccountDomains()
  const domains = domainsData?.domains || []

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full flex-1 h-0 p-6 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        {/* Features Section */}
        <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-100 dark:border-emerald-800/50">
          <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Settings Features</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-emerald-700 dark:text-emerald-400">
            <span className="bg-white dark:bg-emerald-800/30 px-2 py-1 rounded">Domain Management</span>
            <span className="bg-white dark:bg-emerald-800/30 px-2 py-1 rounded">Account Settings</span>
            <span className="bg-white dark:bg-emerald-800/30 px-2 py-1 rounded">Billing & Subscription</span>
            <span className="bg-white dark:bg-emerald-800/30 px-2 py-1 rounded">Security Controls</span>
            <span className="bg-white dark:bg-emerald-800/30 px-2 py-1 rounded">Notification Preferences</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your domains and application settings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain: Domain) => (
            <Link 
              href={`/settings/${domain.name}`} 
              key={domain.id}
              className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {domain.name}
                  </h2>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
              
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Status</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Chatbot</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Enabled
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Customers</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {domain.customer?.length || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          
          {(!domains || domains.length === 0) && (
            <div className="col-span-full bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-8 text-center">
              <Globe className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No Domains Found</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                You don&apos;t have any domains configured yet. Add a domain to get started.
              </p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Add Domain
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-gray-50 dark:bg-neutral-900/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Settings</h2>
          
          <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-gray-100 dark:border-neutral-800 p-6 mb-6 hover:shadow-sm transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-800 dark:text-white">Appearance</h3>
            </div>
            <DarkModetoggle />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-gray-100 dark:border-neutral-800 p-4 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-800 dark:text-white mb-1">Profile</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal information</p>
            </div>
            
            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-gray-100 dark:border-neutral-800 p-4 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-800 dark:text-white mb-1">Billing</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your subscription and payment methods</p>
            </div>
            
            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-gray-100 dark:border-neutral-800 p-4 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-800 dark:text-white mb-1">Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configure your email and app notifications</p>
            </div>
            
            <div className="bg-white dark:bg-neutral-800/50 rounded-lg border border-gray-100 dark:border-neutral-800 p-4 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-800 dark:text-white mb-1">Security</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update password and security settings</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage

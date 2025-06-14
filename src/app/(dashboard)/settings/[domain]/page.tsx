import { onGetCurrentDomainInfo } from '@/actions/settings'
import BotTrainingForm from '@/components/forms/settings/bot-training'
import SettingsForm from '@/components/forms/settings/form'
import InfoBar from '@/components/infobar'
import ProductTable from '@/components/products'
import { Globe, Settings, Bot, ShoppingBag, Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { SideSheet } from '@/components/sheet'
import { CreateProductForm } from '@/components/products/product-form'

type Props = { params: { domain: string } }

const DomainSettingsPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain)
  if (!domain) redirect('/dashboard')
  
  // Add a check to ensure domains array exists and has at least one item
  if (!domain.domains || domain.domains.length === 0) {
    redirect('/dashboard')
  }

  const currentDomain = domain.domains[0]

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full flex-1 h-0 p-6 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        {/* Features Section */}
        <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-800/50">
          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Domain Settings Features</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-amber-700 dark:text-amber-400">
            <span className="bg-white dark:bg-amber-800/30 px-2 py-1 rounded">Domain Configuration</span>
            <span className="bg-white dark:bg-amber-800/30 px-2 py-1 rounded">Chatbot Training</span>
            <span className="bg-white dark:bg-amber-800/30 px-2 py-1 rounded">Product Management</span>
            <span className="bg-white dark:bg-amber-800/30 px-2 py-1 rounded">Integration Settings</span>
            <span className="bg-white dark:bg-amber-800/30 px-2 py-1 rounded">Domain Analytics</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-500" />
            {currentDomain.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your domain settings and configurations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Domain Settings
                </h2>
              </div>
              <SettingsForm
                plan={domain.subscription?.plan!}
                chatBot={currentDomain.chatBot}
                id={currentDomain.id}
                name={currentDomain.name}
              />
            </div>
            
            <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-violet-500" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Chatbot Training
                </h2>
              </div>
              <BotTrainingForm id={currentDomain.id} />
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Products
                  </h2>
                </div>
                <SideSheet
                  description="Add products to your store and set them live to accept payments from customers."
                  title="Add a product"
                  className="flex items-center gap-2 bg-orange px-3 py-1.5 text-black font-semibold rounded-lg text-sm"
                  trigger={
                    <>
                      <Plus size={16} className="text-white" />
                      <p className="text-white">Add Product</p>
                    </>
                  }
                >
                  <CreateProductForm id={currentDomain.id} />
                </SideSheet>
              </div>
              <ProductTable
                id={currentDomain.id}
                products={currentDomain.products || []}
              />
            </div>
            
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 p-6">
              <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Domain Status</h3>
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Active</span>
              </div>
              <div className="mt-4 text-sm text-blue-700 dark:text-blue-400">
                <p>Plan: {domain.subscription?.plan || 'Free'}</p>
                <p className="mt-1">Products: {currentDomain.products?.length || 0}</p>
                <p className="mt-1">Chatbot: {currentDomain.chatBot ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DomainSettingsPage

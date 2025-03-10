'use client'
import { useEmailMarketing } from '@/hooks/email-marketing/use-marketing'
import React from 'react'
import { CustomerTable } from './customer-table'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import Modal from '../mondal'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Loader } from '../loader'
import FormGenerator from '../forms/form-generator'
import { cn, getMonthName } from '@/lib/utils'
import CalIcon from '@/icons/cal-icon'
import PersonIcon from '@/icons/person-icon'
import { EditEmail } from './edit-email'
import EmailAnalytics from './analytics'

type Props = {
  domains: {
    customer: {
      Domain: {
        name: string
      } | null
      id: string
      email: string | null
    }[]
  }[]
  campaign: {
    name: string
    id: string
    customers: string[]
    createdAt: Date
    analytics?: {
      sent: number
      delivered: number
      opened: number
      clicked: number
      bounced: number
    }
  }[]
  subscription: {
    plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
    credits: number
  } | null
}

const EmailMarketing = ({ campaign, domains, subscription }: Props) => {
  const {
    onSelectedEmails,
    isSelected,
    onCreateCampaign,
    register,
    errors,
    loading,
    onSelectCampaign,
    processing,
    onAddCustomersToCampaign,
    campaignId,
    onBulkEmail,
    onSetAnswersId,
    isId,
    registerEmail,
    emailErrors,
    onCreateEmailTemplate,
    setValue,
  } = useEmailMarketing()

  return (
    <div className="w-full flex-1 h-full flex overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950 p-6">
        {/* Features Section */}
        <div className="mb-6 bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3 border border-violet-100 dark:border-violet-800/50">
          <h3 className="text-sm font-medium text-violet-800 dark:text-violet-300">Email Marketing Features</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-violet-700 dark:text-violet-400">
            <span className="bg-white dark:bg-violet-800/30 px-2 py-1 rounded">Campaign Management</span>
            <span className="bg-white dark:bg-violet-800/30 px-2 py-1 rounded">Contact Lists</span>
            <span className="bg-white dark:bg-violet-800/30 px-2 py-1 rounded">Email Templates</span>
            <span className="bg-white dark:bg-violet-800/30 px-2 py-1 rounded">Analytics Tracking</span>
            <span className="bg-white dark:bg-violet-800/30 px-2 py-1 rounded">Bulk Sending</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contacts Panel */}
          <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Contacts</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                {domains.reduce((acc, domain) => acc + domain.customer.length, 0)} contacts
              </div>
            </div>
            <div className="h-[calc(100vh-380px)] overflow-y-auto pr-1 custom-scrollbar">
              <CustomerTable
                domains={domains}
                onId={onSetAnswersId}
                onSelect={onSelectedEmails}
                select={isSelected}
                id={isId}
              />
            </div>
          </div>

          {/* Campaigns Panel */}
          <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Your Campaigns</h2>
              <div className="bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-xs font-medium">
                {campaign.length} campaigns
              </div>
            </div>
            <div className="h-[calc(100vh-380px)] overflow-y-auto pr-1 custom-scrollbar">
              {campaign && campaign.length > 0 ? (
                <div className="space-y-4">
                  {campaign.map((camp) => (
                    <Card
                      key={camp.id}
                      className={cn(
                        'p-5 w-full border border-gray-100 dark:border-neutral-800 transition-all duration-300',
                        campaignId == camp.id 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50' 
                          : 'bg-white dark:bg-neutral-800/50 hover:bg-gray-50 dark:hover:bg-neutral-700/50'
                      )}
                    >
                      <Loader loading={processing}>
                        <CardContent className="p-0 flex flex-col gap-4">
                          <div className="flex w-full justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <CalIcon />
                              <CardDescription>
                                Created {getMonthName(new Date(camp.createdAt).getMonth())}{' '}
                                {new Date(camp.createdAt).getDate()}th
                              </CardDescription>
                            </div>
                            <div className="flex gap-2 items-center">
                              <PersonIcon />
                              <CardDescription>
                                {camp.customers.length} contacts
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex w-full justify-between items-center">
                            <CardTitle className="text-xl">{camp.name}</CardTitle>
                            <div className="flex gap-3">
                              <Modal
                                title="Edit Email"
                                description="This email will be sent to campaign members"
                                trigger={
                                  <Button variant="outline" className="text-sm h-9">
                                    Edit Email
                                  </Button>
                                }
                              >
                                <EditEmail
                                  register={registerEmail}
                                  errors={emailErrors}
                                  setDefault={setValue}
                                  id={camp.id}
                                  onCreate={onCreateEmailTemplate}
                                />
                              </Modal>
                              <Button
                                variant="default"
                                className="bg-blue-600 hover:bg-blue-700 text-white h-9"
                                onClick={() => onBulkEmail(camp.customers, camp.id)}
                              >
                                Send
                              </Button>
                            </div>
                          </div>
                          {camp.analytics && (
                            <EmailAnalytics
                              campaignId={camp.id}
                              analytics={camp.analytics}
                            />
                          )}
                        </CardContent>
                      </Loader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No campaigns created yet</p>
                  <p className="text-sm mt-1">Create your first campaign to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 overflow-y-auto">
        <div className="sticky top-0">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Email Marketing</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create and manage your campaigns
            </p>
          </div>

          {/* Campaign Actions */}
          <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Campaign Actions</h2>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-xs font-medium">
                {subscription?.credits || 0} credits
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button
                disabled={isSelected.length == 0}
                onClick={onAddCustomersToCampaign}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add to campaign
              </Button>
              
              <Modal
                title="Create a new campaign"
                description="Add your customers and create a marketing campaign"
                trigger={
                  <Button variant="outline" className="w-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 justify-center">
                    <Loader loading={false}>
                      <Plus className="w-4 h-4 mr-1" /> Create Campaign
                    </Loader>
                  </Button>
                }
              >
                <form className="flex flex-col gap-4" onSubmit={onCreateCampaign}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Campaign Name</label>
                    <input
                      {...register('name')}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Your campaign name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message as string}</p>
                    )}
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={loading}
                    type="submit"
                  >
                    <Loader loading={loading}>Create Campaign</Loader>
                  </Button>
                </form>
              </Modal>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-lg p-3 border border-gray-100 dark:border-neutral-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Contacts</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {domains.reduce((acc, domain) => acc + domain.customer.length, 0)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-lg p-3 border border-gray-100 dark:border-neutral-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Campaigns</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {campaign.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
  )
}

export default EmailMarketing

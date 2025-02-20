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
    <div className="w-full flex-1 h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 p-4">
      <CustomerTable
        domains={domains}
        onId={onSetAnswersId}
        onSelect={onSelectedEmails}
        select={isSelected}
        id={isId}
      />
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            disabled={isSelected.length == 0}
            onClick={onAddCustomersToCampaign}
            className="w-full sm:w-auto"
          >
            <Plus /> Add to campaign
          </Button>
          <Modal
            title="Create a new campaign"
            description="Add your customers and create a marketing campaign"
            trigger={
              <Card className="flex gap-2 items-center px-3 cursor-pointer text-sm w-full sm:w-auto hover:bg-accent">
                <Loader loading={false}>
                  <Plus /> <span className='p-3 md:p-0'>Create Campaign</span>
                </Loader>
              </Card>
            }
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={onCreateCampaign}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Name</label>
                <input
                  {...register('name')}
                  className="w-full p-2 border rounded"
                  placeholder="Your campaign name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message as string}</p>
                )}
              </div>
              <Button
                className="w-full hover:bg-orange"
                disabled={loading}
                type="submit"
              >
                <Loader loading={loading}>Create Campaign</Loader>
              </Button>
            </form>
          </Modal>
          <Card className="p-2 w-full sm:w-auto">
            <CardDescription className="font-bold text-center sm:text-left">
              {subscription?.credits} credits
            </CardDescription>
          </Card>
        </div>
        <div className="flex flex-col items-center lg:items-end gap-3">
          {campaign &&
            campaign.map((camp) => (
              <Card
                key={camp.id}
                className={cn(
                  'p-5 w-full',
                  campaignId == camp.id ? 'bg-gray-50' : ''
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
                      <div className="flex gap-2">
                        <PersonIcon />
                        <CardDescription>
                          {camp.customers.length} customers added
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
                            <Card className="rounded-lg cursor-pointer bg-grandis py-2 px-5 font-semibold text-sm hover:bg-orange text-gray-700">
                              Edit Email
                            </Card>
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
                          className="rounded-lg"
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
      </div>
    </div>
  )
}

export default EmailMarketing

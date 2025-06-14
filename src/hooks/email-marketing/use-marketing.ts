import {
  onAddCustomersToEmail,
  onBulkMailer,
  onCreateMarketingCampaign,
  onDeleteCampaign,
  onDuplicateCampaign,
  onGetAllCustomerResponses,
  onGetEmailTemplate,
  onSaveEmailTemplate,
} from '@/actions/mail'
import { useToast } from '@/components/ui/use-toast'
import {
  EmailMarketingBodySchema,
  EmailMarketingSchema,
} from '@/schemas/marketing.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useEmailMarketing = () => {
  const [isSelected, setIsSelected] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [campaignId, setCampaignId] = useState<string | undefined>()
  const [processing, setProcessing] = useState<boolean>(false)
  const [isId, setIsId] = useState<string | undefined>(undefined)
  const [editing, setEditing] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [duplicating, setDuplicating] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(EmailMarketingSchema),
  })

  const {
    register: registerEmail,
    formState: { errors: emailErrors },
    handleSubmit: SubmitEmail,
    setValue,
  } = useForm({
    resolver: zodResolver(EmailMarketingBodySchema),
  })
  const { toast } = useToast()
  const router = useRouter()

  const onCreateCampaign = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const campaign = await onCreateMarketingCampaign(values.name, isSelected)
      if (campaign && campaign.status === 200) {
        reset()
        toast({
          title: 'Success',
          description: campaign.message,
        })
        setIsSelected([])
        setLoading(false)
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: campaign?.message || 'Failed to create campaign',
          variant: 'destructive'
        })
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while creating the campaign',
        variant: 'destructive'
      })
      setLoading(false)
    }
  })

  const onCreateEmailTemplate = SubmitEmail(async (values) => {
    try {
      if (!campaignId) {
        toast({
          title: 'Error',
          description: 'Please select a campaign first',
          variant: 'destructive'
        })
        return
      }
      
      setEditing(true)
      
      // Ensure we have a valid string to save
      let template = '';
      
      if (!values.description) {
        // If no content, use a default empty template
        template = '<p>Empty template</p>';
      } else if (typeof values.description === 'string') {
        template = values.description;
      } else {
        // Handle non-string content
        try {
          template = JSON.stringify(values.description);
        } catch (e) {
          console.error("Error stringifying template:", e);
          template = String(values.description);
        }
      }
      
      // Make sure template isn't too large
      if (template.length > 1000000) { // 1MB limit
        toast({
          title: 'Error',
          description: 'Template is too large. Please reduce the size.',
          variant: 'destructive'
        })
        return;
      }
        
      const emailTemplate = await onSaveEmailTemplate(template, campaignId)
      if (emailTemplate && emailTemplate.status === 200) {
        toast({
          title: 'Success',
          description: emailTemplate.message,
        })
      } else {
        toast({
          title: 'Error',
          description: emailTemplate?.message || 'Failed to save email template',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error("Template save error:", error)
      toast({
        title: 'Error',
        description: 'Failed to save email template',
        variant: 'destructive'
      })
    } finally {
      setEditing(false)
    }
  })

  const onSelectCampaign = (id: string) => setCampaignId(id)

  const onAddCustomersToCampaign = async () => {
    try {
      setProcessing(true)
      const customersAdd = await onAddCustomersToEmail(isSelected, campaignId!)
      if (customersAdd && customersAdd.status === 200) {
        toast({
          title: 'Success',
          description: customersAdd.message,
        })
        setProcessing(false)
        setCampaignId(undefined)
        setIsSelected([])
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: customersAdd?.message || 'Failed to add customers to campaign',
          variant: 'destructive'
        })
        setProcessing(false)
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while adding customers to campaign',
        variant: 'destructive'
      })
      setProcessing(false)
    }
  }

  const onSelectedEmails = (email: string) => {
    //add or remove
    const duplicate = isSelected.find((e) => e == email)
    if (duplicate) {
      setIsSelected(isSelected.filter((e) => e !== email))
    } else {
      setIsSelected((prev) => [...prev, email])
    }
  }

  const onBulkEmail = async (emails: string[], campaignId: string) => {
    try {
      if (emails.length === 0) {
        toast({
          title: 'Error',
          description: 'No customers selected for this campaign',
          variant: 'destructive'
        })
        return
      }
      
      const mails = await onBulkMailer(emails, campaignId)
      if (mails && mails.status === 200) {
        toast({
          title: 'Success',
          description: mails.message,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: mails?.message || 'Failed to send emails',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while sending emails',
        variant: 'destructive'
      })
    }
  }

  const onSetAnswersId = (id: string) => setIsId(id)

  const onDeleteCampaignHandler = async (id: string) => {
    try {
      setDeleting(true)
      const result = await onDeleteCampaign(id)
      
      // Success case
      if (result && result.status === 200) {
        toast({
          title: 'Success',
          description: result.message,
        })
        if (campaignId === id) {
          setCampaignId(undefined)
        }
        // No need to refresh since we're using optimistic UI updates
      } 
      // Error case
      else {
        toast({
          title: 'Error',
          description: result?.message || 'Failed to delete campaign',
          variant: 'destructive'
        })
        // Since the optimistic UI update already happened, we should refresh to get the actual state
        router.refresh()
      }
    } catch (error) {
      console.error("Campaign deletion error:", error);
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the campaign',
        variant: 'destructive'
      })
      // Since the optimistic UI update already happened, we should refresh to get the actual state
      router.refresh()
    } finally {
      setDeleting(false)
    }
  }

  const onDuplicateCampaignHandler = async (id: string) => {
    try {
      setDuplicating(true)
      const result = await onDuplicateCampaign(id)
      if (result && result.status === 200) {
        toast({
          title: 'Success',
          description: result.message,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: result?.message || 'Failed to duplicate campaign',
          variant: 'destructive'
        })
      }
      setDuplicating(false)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while duplicating the campaign',
        variant: 'destructive'
      })
      setDuplicating(false)
    }
  }

  return {
    onSelectedEmails,
    isSelected,
    onCreateCampaign,
    register,
    errors,
    loading,
    onSelectCampaign,
    processing,
    campaignId,
    onAddCustomersToCampaign,
    onBulkEmail,
    onSetAnswersId,
    isId,
    registerEmail,
    emailErrors,
    onCreateEmailTemplate,
    editing,
    setValue,
    onDeleteCampaignHandler,
    deleting,
    onDuplicateCampaignHandler,
    duplicating,
  }
}

export const useAnswers = (id: string) => {
  const [answers, setAnswers] = useState<
    {
      customer: {
        questions: { question: string; answered: string | null }[]
      }[]
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  const onGetCustomerAnswers = async () => {
    try {
      setLoading(true)
      const answer = await onGetAllCustomerResponses(id)
      setLoading(false)
      if (answer) {
        setAnswers(answer)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onGetCustomerAnswers()
  }, [])

  return { answers, loading }
}

export const useEditEmail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [template, setTemplate] = useState<string>('')

  const onGetTemplate = async (id: string) => {
    try {
      setLoading(true)
      if (!id) {
        setLoading(false)
        return
      }
      
      const email = await onGetEmailTemplate(id)
      if (email) {
        setTemplate(email)
      } else {
        // If no template exists yet, set an empty default
        setTemplate('<p>Enter your email content here...</p>')
      }
    } catch (error) {
      console.error("Error loading template:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      onGetTemplate(id)
    } else {
      // Reset template if no ID
      setTemplate('')
    }
  }, [id])

  return { loading, template }
}

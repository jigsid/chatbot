import {
  onBookNewAppointment,
  onDomainCustomerResponses,
  saveAnswers,
} from '@/actions/appointment'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const usePortal = (
  customerId: string,
  domainId: string,
  email: string
) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const { toast } = useToast()
  const [step, setStep] = useState<number>(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)

  setValue('date', date)

  const onNext = () => setStep((prev) => prev + 1)

  const onPrev = () => setStep((prev) => prev - 1)

  const onBookAppointment = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const questions = Object.keys(values)
        .filter((key) => key.startsWith('question'))
        .reduce((obj: any, key) => {
          obj[key.split('question-')[1]] = values[key]
          return obj
        }, {})

      const savedAnswers = await saveAnswers(questions, customerId)

      if (savedAnswers && date) {
        // Format date as ISO string for server action
        const formattedDate = date.toISOString();
        
        const booked = await onBookNewAppointment(
          domainId,
          customerId,
          values.slot,
          formattedDate,
          email
        )
        if (booked && booked.status == 200) {
          toast({
            title: 'Success',
            description: booked.message,
          })
          setStep(3)
        }

        setLoading(false)
      } else {
        toast({
          title: 'Error',
          description: 'Please select a date and time',
          variant: 'destructive'
        })
        setLoading(false)
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Error',
        description: 'Failed to book appointment',
        variant: 'destructive'
      })
      setLoading(false)
    }
  })

  const onSelectedTimeSlot = (slot: string) => setSelectedSlot(slot)

  return {
    step,
    onNext,
    onPrev,
    register,
    errors,
    loading,
    onBookAppointment,
    date,
    setDate,
    onSelectedTimeSlot,
    selectedSlot,
  }
}

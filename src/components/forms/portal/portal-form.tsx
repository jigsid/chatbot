'use client'
import { usePortal } from '@/hooks/portal/use-portal'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import PortalSteps from './portal-steps'

type PortalFormProps = {
  questions: {
    id: string
    question: string
    answered: string | null
  }[]
  type: 'Appointment' | 'Payment'
  customerId: string
  domainid: string
  email: string
  bookings?:
    | {
        date: Date
        slot: string
      }[]
    | undefined
  products?:
    | {
        name: string
        image: string
        price: number
      }[]
    | undefined
  amount?: number
  stripeId?: string
}

const PortalForm = ({
  questions,
  type,
  customerId,
  domainid,
  email,
  bookings,
  products,
  amount,
  stripeId,
}: PortalFormProps) => {
  const {
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
  } = usePortal(customerId, domainid, email)

  useEffect(() => {
    if (step == 3) {
      onBookAppointment()
    }
  }, [step])

  return (
    <form onSubmit={onNext}>
      <PortalSteps
        step={step}
        type={type}
        questions={questions}
        register={register}
        errors={errors}
        onNext={onNext}
        onBack={onPrev}
        loading={loading}
        slot={selectedSlot}
        bookings={bookings}
        onSlot={onSelectedTimeSlot}
        date={date}
        onBooking={setDate}
        products={products}
        amount={amount}
        stripeId={stripeId}
      />
      {(step == 1 || step == 2) && (
        <div className="w-full flex justify-center">
          <div className="w-[400px] grid grid-cols-2 gap-3">
            <div
              className={cn(
                'rounded-full h-2 col-span-1',
                step == 1 ? 'bg-orange' : 'bg-platinum'
              )}
            ></div>
            <div
              className={cn(
                'rounded-full h-2 col-span-1',
                step == 2 ? 'bg-orange' : 'bg-platinum'
              )}
            ></div>
          </div>
        </div>
      )}
    </form>
  )
}

export default PortalForm

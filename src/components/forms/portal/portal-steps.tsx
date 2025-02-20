import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import BookAppointmentDate from './booking-date'
import PaymentCheckout from './product-checkout'
import QuestionsForm from './questions'
import { RecurrencePattern, CalendarProvider } from '@/types/appointment'

type Props = {
  step: number
  questions: {
    id: string
    question: string
    answered: string | null
  }[]
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  type: 'Appointment' | 'Payment'
  date: Date | undefined
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>
  slot: string | undefined
  onSlot(slot: string): void
  loading: boolean
  bookings:
    | {
        date: Date
        slot: string
      }[]
    | undefined
  onBack(): void
  onNext(): void
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

const PortalSteps = ({
  step,
  questions,
  register,
  errors,
  type,
  date,
  onBooking,
  slot,
  onSlot,
  loading,
  bookings,
  onBack,
  onNext,
  products,
  amount,
  stripeId,
}: Props) => {
  const [recurrence, setRecurrence] = React.useState<RecurrencePattern>();
  const [calendarProvider, setCalendarProvider] = React.useState<CalendarProvider['type']>();
  const [reminderTiming, setReminderTiming] = React.useState<number>(30);

  if (step == 1) {
    return (
      <QuestionsForm
        questions={questions}
        register={register}
        errors={errors}
        onNext={onNext}
      />
    )
  }

  if (step == 2 && type == 'Appointment') {
    return (
      <BookAppointmentDate
        date={date}
        bookings={bookings}
        currentSlot={slot}
        register={register}
        onBack={onBack}
        onBooking={onBooking}
        onSlot={onSlot}
        loading={loading}
        onRecurrenceChange={setRecurrence}
        onCalendarChange={setCalendarProvider}
        onReminderChange={setReminderTiming}
      />
    )
  }

  if (step == 2 && type == 'Payment') {
    return (
      <PaymentCheckout
        products={products}
        amount={amount}
        stripeId={stripeId}
        onBack={onBack}
        onNext={onNext}
      />
    )
  }

  return null
}

export default PortalSteps

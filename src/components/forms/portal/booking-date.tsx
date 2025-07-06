import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { APPOINTMENT_TIME_SLOTS } from '@/constants/timeslots'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { CalendarProvider, RecurrencePattern } from '@/types/appointment'

type Props = {
  date: Date | undefined
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>
  onBack(): void
  register: UseFormRegister<FieldValues>
  onSlot(slot: string): void
  currentSlot?: string
  loading: boolean
  bookings: { date: Date; slot: string }[] | undefined
  onRecurrenceChange(pattern: RecurrencePattern | undefined): void
  onCalendarChange(provider: CalendarProvider['type'] | undefined): void
  onReminderChange(timing: number): void
}

const BookAppointmentDate = ({
  date,
  onBooking,
  onBack,
  register,
  onSlot,
  currentSlot,
  loading,
  bookings,
  onRecurrenceChange,
  onCalendarChange,
  onReminderChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold mb-5">Book a meeting</h2>
      </div>
      
      <Tabs defaultValue="datetime" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="datetime">Date & Time</TabsTrigger>
          <TabsTrigger value="recurrence">Recurrence</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="datetime">
          <div className="flex gap-10 flex-col sm:flex-row">
            <div className="w-[300px]">
              <h6>Discovery Call</h6>
              <CardDescription>
                During this call, we aim to explore potential avenues for
                partnership, promotional opportunities, or any other means through
                which we can contribute to the success of your company.
              </CardDescription>
            </div>
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={onBooking}
                className="rounded-md border"
                disabled={(date) => {
                  // Disable past dates
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today || date > new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
                }}
              />
            </div>
            <div className="flex flex-col gap-5">
              {APPOINTMENT_TIME_SLOTS.map((slot, key) => (
                <Label
                  htmlFor={`slot-${key}`}
                  key={key}
                >
                  <Card
                    onClick={() => onSlot(slot.slot)}
                    className={cn(
                      currentSlot == slot.slot ? 'bg-grandis' : 'bg-peach',
                      'px-10 py-4',
                      bookings?.some(
                        (booking) =>
                          date && 
                          booking.date.getDate() === date.getDate() &&
                          booking.date.getMonth() === date.getMonth() &&
                          booking.date.getFullYear() === date.getFullYear() &&
                          booking.slot === slot.slot
                      )
                        ? 'bg-gray-300'
                        : 'cursor-pointer border-orange hover:bg-grandis transition duration-150 ease-in-out'
                    )}
                  >
                    <Input
                      {...(bookings?.some(
                        (booking) =>
                          date &&
                          booking.date.getDate() === date.getDate() &&
                          booking.date.getMonth() === date.getMonth() &&
                          booking.date.getFullYear() === date.getFullYear() &&
                          booking.slot === slot.slot
                      )
                        ? {
                            disabled: true,
                          }
                        : {
                            disabled: false,
                          })}
                      className="hidden"
                      type="radio"
                      value={slot.slot}
                      {...register('slot')}
                      id={`slot-${key}`}
                    />
                    {slot.slot}
                  </Card>
                </Label>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recurrence">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Recurring Meetings</Label>
                <Switch
                  {...register('enableRecurring')}
                  onCheckedChange={(checked) => {
                    if (!checked) onRecurrenceChange(undefined);
                  }}
                />
              </div>

              <div className="space-y-4">
                <Select
                  onValueChange={(value) =>
                    onRecurrenceChange({
                      type: value as RecurrencePattern['type'],
                      interval: 1,
                    })
                  }
                  {...register('recurrenceType')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Interval (e.g., every 2 weeks)"
                  min="1"
                  {...register('recurrenceInterval')}
                />

                <Input
                  type="date"
                  placeholder="End Date (Optional)"
                  {...register('recurrenceEndDate')}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Add to Calendar</Label>
                <Switch {...register('addToCalendar')} />
              </div>

              <Select
                onValueChange={(value) =>
                  onCalendarChange(value as CalendarProvider['type'])
                }
                {...register('calendarProvider')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select calendar provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Calendar</SelectItem>
                  <SelectItem value="outlook">Outlook Calendar</SelectItem>
                  <SelectItem value="ical">iCal</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Label>Reminder</Label>
                <Select
                  onValueChange={(value) => onReminderChange(Number(value))}
                  {...register('reminderTiming')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reminder timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                    <SelectItem value="1440">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-5 justify-center mt-5">
        <Button
          type="button"
          onClick={onBack}
          variant={'outline'}
        >
          Edit Questions?
        </Button>
        <Button>
          <Loader loading={loading}>Book Now</Loader>
        </Button>
      </div>
    </div>
  )
}

export default BookAppointmentDate

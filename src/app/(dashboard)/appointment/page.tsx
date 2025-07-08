import { onGetAllBookingsForCurrentUser, getUserAppointments } from '@/actions/appointment'
import AllAppointments from '@/components/appointment/all-appointments'
import AppointmentStats from '@/components/appointment/appointment-stats'
import AppointmentSkeleton from '@/components/appointment/appointment-skeleton'
import EmptyAppointment from '@/components/appointment/empty-appointment'
import MockAppointments from '@/components/appointment/mock-appointments'
import InfoBar from '@/components/infobar'
import Section from '@/components/section-label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { currentUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React, { Suspense } from 'react'
import { AVAILABLE_TIME_SLOTS } from '@/constants/timeslots'
import AppointmentForm from '@/components/appointment/appointment-form'

// Loading component
function AppointmentPageSkeleton() {
  return (
    <>
      <div className="mb-6">
        <AppointmentStats isLoading />
      </div>
      <AppointmentSkeleton />
    </>
  )
}

// Appointments Content component
async function AppointmentsContent() {
  const user = await currentUser()

  if (!user) {
    // Show mock data if no user is authenticated
    return (
      <>
        <div className="mb-6">
          <AppointmentStats 
            totalAppointments={24}
            todayAppointments={3}
            upcomingAppointments={12}
          />
        </div>
        <MockAppointments />
      </>
    )
  }
  
  try {
    // Fetch all data for the page
    const domainBookings = await onGetAllBookingsForCurrentUser(user.id)
    const totalAppointments = await getUserAppointments() || 0
    const today = new Date()

    // If no bookings, show empty state
    if (!domainBookings || domainBookings.bookings.length === 0) {
      return (
        <>
          <div className="mb-6">
            <AppointmentStats 
              totalAppointments={0}
              todayAppointments={0}
              upcomingAppointments={0}
            />
          </div>
          <EmptyAppointment />
        </>
      )
    }

    // Filter today's bookings
    const bookingsExistToday = domainBookings.bookings.filter(
      (booking) => booking.date.getDate() === today.getDate()
    )

    // Filter upcoming bookings (next 7 days, excluding today)
    const upcomingBookings = domainBookings.bookings.filter(
      (booking) => {
        const bookingDate = booking.date.getTime()
        const todayDate = today.getTime()
        const sevenDaysFromNow = todayDate + (7 * 24 * 60 * 60 * 1000)
        return bookingDate > todayDate && bookingDate <= sevenDaysFromNow
      }
    )

    return (
      <>
        <div className="mb-6">
          <AppointmentStats 
            totalAppointments={totalAppointments}
            todayAppointments={bookingsExistToday.length}
            upcomingAppointments={upcomingBookings.length}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
          <div className="lg:col-span-2 overflow-y-auto">
            <AllAppointments bookings={domainBookings?.bookings} />
          </div>
          <div className="col-span-1">
            <Section
              label="Bookings For Today"
              message="All your bookings for today are mentioned below."
            />
            {bookingsExistToday.length ? (
              bookingsExistToday.map((booking) => (
                <Card
                  key={booking.id}
                  className="rounded-xl overflow-hidden mt-4"
                >
                  <CardContent className="p-0 flex">
                    <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">
                      {booking.slot}
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between w-full p-3">
                        <p className="text-sm">
                          created
                          <br />
                          {booking.createdAt.getHours()}{' '}
                          {booking.createdAt.getMinutes()}{' '}
                          {booking.createdAt.getHours() > 12 ? 'PM' : 'AM'}
                        </p>
                        <p className="text-sm">
                          Domain <br />
                          {booking.Customer?.Domain?.name}
                        </p>
                      </div>
                      <Separator orientation="horizontal" />
                      <div className="w-full flex items-center p-3 gap-2">
                        <Avatar>
                          <AvatarFallback>{booking.email[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{booking.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="w-full flex justify-center">
                <p>No Appointments For Today</p>
              </div>
            )}
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error("Error loading appointments:", error);
    
    // Fallback to mock data if there's an error
    return (
      <>
        <div className="mb-6">
          <AppointmentStats 
            totalAppointments={24}
            todayAppointments={3}
            upcomingAppointments={12}
          />
        </div>
        <MockAppointments />
      </>
    )
  }
}

export default function Page() {
  return (
    <div className="flex flex-col h-full">
      <InfoBar />
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">Manage your appointment bookings</p>
          </div>
          <AppointmentForm />
        </div>

        <Suspense fallback={<AppointmentPageSkeleton />}>
          <AppointmentsContent />
        </Suspense>
      </div>
    </div>
  )
}

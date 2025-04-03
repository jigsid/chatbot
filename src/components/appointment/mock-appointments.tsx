'use client'

import React from 'react'
import { DataTable } from '../table'
import { TableCell, TableRow } from '../ui/table'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu'
import Section from '../section-label'

const MockAppointments = () => {
  // Simulate appointment data
  const mockBookings = [
    {
      id: '1',
      email: 'john.doe@example.com',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      slot: '10:00 AM',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      domainName: 'Main Website'
    },
    {
      id: '2',
      email: 'sarah.smith@example.com',
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      slot: '2:30 PM',
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
      domainName: 'Mobile App'
    },
    {
      id: '3',
      email: 'michael.brown@example.com',
      date: new Date(), // Today
      slot: '4:00 PM',
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      domainName: 'Main Website'
    }
  ]

  // Get today's bookings
  const today = new Date()
  const todayBookings = mockBookings.filter(
    booking => booking.date.getDate() === today.getDate()
  )

  // Format date to Month DD, YYYY
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format time to HH:MM AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
        <div className="lg:col-span-2 overflow-y-auto">
          <DataTable headers={APPOINTMENT_TABLE_HEADER}>
            {mockBookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell>{booking.email}</TableCell>
                <TableCell>
                  <div>{formatDate(booking.date)}</div>
                  <div className="uppercase">{booking.slot}</div>
                </TableCell>
                <TableCell>
                  <div>{formatDate(booking.createdAt)}</div>
                  <div>{formatTime(booking.createdAt)}</div>
                </TableCell>
                <TableCell className="text-right">{booking.domainName}</TableCell>
              </TableRow>
            ))}
          </DataTable>
        </div>

        <div className="col-span-1">
          <Section
            label="Bookings For Today"
            message="All your bookings for today are mentioned below."
          />
          {todayBookings.length ? (
            todayBookings.map(booking => (
              <Card key={booking.id} className="rounded-xl overflow-hidden mt-4">
                <CardContent className="p-0 flex">
                  <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">
                    {booking.slot}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between w-full p-3">
                      <p className="text-sm">
                        created
                        <br />
                        {formatTime(booking.createdAt)}
                      </p>
                      <p className="text-sm">
                        Domain <br />
                        {booking.domainName}
                      </p>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="w-full flex items-center p-3 gap-2">
                      <Avatar>
                        <AvatarFallback>{booking.email[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{booking.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="w-full flex justify-center mt-4">
              <p>No Appointments For Today</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MockAppointments 
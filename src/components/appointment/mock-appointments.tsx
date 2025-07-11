'use client'

import React from 'react'
import { DataTable } from '../table'
import { TableCell, TableRow } from '../ui/table'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu'
import Section from '../section-label'
import { formatDate, formatTime } from '@/lib/utils'

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

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
        <div className="lg:col-span-2 overflow-y-auto">
          <DataTable headers={APPOINTMENT_TABLE_HEADER}>
            {mockBookings.map(booking => (
              <TableRow key={booking.id} className="hover:bg-gray-50">
                <TableCell className="min-w-[250px] py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{booking.email[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{booking.email}</div>
                      <div className="text-xs text-muted-foreground">Customer ID: {booking.id.substring(0, 8)}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="font-medium">
                    {formatDate(booking.date)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase">
                    {booking.slot}
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="font-medium">
                    {formatDate(booking.createdAt)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(booking.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="min-w-[150px]">
                  <div className="font-medium">
                    {booking.domainName}
                  </div>
                </TableCell>
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
                  <div className="w-5/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">
                    {booking.slot}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between w-full p-4">
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Created</p>
                        <p>{formatTime(booking.createdAt)}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(booking.createdAt)}</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Domain</p>
                        <p>{booking.domainName}</p>
                      </div>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="w-full flex items-center p-4 gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{booking.email[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.email}</p>
                        <p className="text-xs text-muted-foreground">Customer ID: {booking.id.substring(0, 8)}</p>
                      </div>
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
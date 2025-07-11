import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu'
import React from 'react'
import { DataTable } from '../table'
import { TableCell, TableRow } from '../ui/table'
import { formatDate, formatTime, getMonthName } from '@/lib/utils'
import { CardDescription } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string
          } | null
        } | null
        id: string
        email: string
        domainId: string | null
        date: Date
        slot: string
        createdAt: Date
      }[]
    | undefined
}

const AllAppointments = ({ bookings }: Props) => {
  return (
    <DataTable headers={APPOINTMENT_TABLE_HEADER}>
      {bookings ? (
        bookings.map((booking) => (
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
                {booking.Customer?.Domain?.name || "Unknown Domain"}
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="h-24 text-center">
            <CardDescription>No Appointments</CardDescription>
          </TableCell>
        </TableRow>
      )}
    </DataTable>
  )
}

export default AllAppointments

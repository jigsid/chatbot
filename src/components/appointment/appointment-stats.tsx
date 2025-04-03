'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ArrowUpRight, Calendar, Clock, Users } from 'lucide-react'

interface AppointmentStatsProps {
  totalAppointments?: number
  todayAppointments?: number
  upcomingAppointments?: number
  isLoading?: boolean
}

const AppointmentStats = ({ 
  totalAppointments = 24,
  todayAppointments = 3,
  upcomingAppointments = 12,
  isLoading = false
}: AppointmentStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? '-' : totalAppointments}</div>
          <p className="text-xs text-muted-foreground">
            All time appointments
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? '-' : todayAppointments}</div>
          <div className="flex items-center pt-1">
            {!isLoading && todayAppointments > 0 && (
              <>
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <p className="text-xs text-green-500">Active today</p>
              </>
            )}
            {!isLoading && todayAppointments === 0 && (
              <p className="text-xs text-muted-foreground">No appointments today</p>
            )}
            {isLoading && (
              <p className="text-xs text-muted-foreground">Loading...</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? '-' : upcomingAppointments}</div>
          <p className="text-xs text-muted-foreground">
            Next 7 days
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AppointmentStats 
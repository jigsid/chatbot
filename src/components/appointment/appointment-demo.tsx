'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AppointmentSkeleton from './appointment-skeleton'
import EmptyAppointment from './empty-appointment'
import MockAppointments from './mock-appointments'
import AppointmentStats from './appointment-stats'
import { Button } from '../ui/button'
import { Info } from 'lucide-react'

const AppointmentDemo = () => {
  const handleCreateNew = () => {
    alert('Create new appointment clicked')
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your appointment bookings</p>
        </div>
        <Button>Create New</Button>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium">Appointment Demo</p>
          <p className="text-sm">This is a demonstration of the appointment UI components. Select different views from the tabs below.</p>
        </div>
      </div>
      
      <Tabs defaultValue="loaded">
        <TabsList className="mb-4">
          <TabsTrigger value="loaded">Loaded Data</TabsTrigger>
          <TabsTrigger value="loading">Loading State</TabsTrigger>
          <TabsTrigger value="empty">Empty State</TabsTrigger>
        </TabsList>
        
        <TabsContent value="loaded" className="space-y-6">
          <AppointmentStats 
            totalAppointments={24}
            todayAppointments={3}
            upcomingAppointments={12}
          />
          <MockAppointments />
        </TabsContent>
        
        <TabsContent value="loading" className="space-y-6">
          <AppointmentStats isLoading />
          <AppointmentSkeleton />
        </TabsContent>
        
        <TabsContent value="empty" className="space-y-6">
          <AppointmentStats 
            totalAppointments={0}
            todayAppointments={0}
            upcomingAppointments={0}
          />
          <EmptyAppointment onCreateNew={handleCreateNew} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AppointmentDemo 
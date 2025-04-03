'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Calendar, ClipboardList, Plus } from 'lucide-react'

interface EmptyAppointmentProps {
  onCreateNew?: () => void
}

const EmptyAppointment = ({ onCreateNew }: EmptyAppointmentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
      <div className="lg:col-span-2 overflow-y-auto">
        <Card className="rounded-xl overflow-hidden h-full flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <ClipboardList className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl mb-2">No appointments yet</CardTitle>
            <CardDescription className="mb-6">
              You don't have any appointments scheduled. When customers book appointments, they will appear here.
            </CardDescription>
            {onCreateNew && (
              <Button onClick={onCreateNew} className="gap-1">
                <Plus className="w-4 h-4" /> Create Appointment
              </Button>
            )}
          </div>
        </Card>
      </div>
      
      <div className="col-span-1">
        <Card className="rounded-xl overflow-hidden h-full flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg mb-2">No bookings for today</CardTitle>
            <CardDescription>
              You don't have any bookings scheduled for today.
            </CardDescription>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EmptyAppointment 
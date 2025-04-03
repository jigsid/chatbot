import React from 'react'
import AppointmentDemo from '@/components/appointment/appointment-demo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Appointment Demo',
  description: 'A demonstration of the appointment UI components',
}

const AppointmentDemoPage = () => {
  return (
    <AppointmentDemo />
  )
}

export default AppointmentDemoPage 
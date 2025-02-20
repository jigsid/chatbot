export type AppointmentTimeSlots = {
  slot: string;
}

export type RecurrencePattern = {
  type: 'daily' | 'weekly' | 'monthly';
  interval: number; // e.g., every 2 weeks
  endDate?: Date;
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday
  dayOfMonth?: number;
}

export type CalendarProvider = {
  type: 'google' | 'outlook' | 'ical';
  connected: boolean;
  email?: string;
  lastSync?: Date;
}

export type Appointment = {
  id: string;
  date: Date;
  slot: string;
  email: string;
  domainId: string | null;
  createdAt: Date;
  status: 'scheduled' | 'cancelled' | 'rescheduled' | 'completed';
  recurrence?: RecurrencePattern;
  calendarEvent?: {
    provider: CalendarProvider['type'];
    eventId: string;
    link?: string;
  };
  reminders: {
    type: 'email' | 'notification';
    scheduledFor: Date;
    sent: boolean;
  }[];
  Customer: {
    Domain: {
      name: string;
    } | null;
  } | null;
}

export type BookingFormData = {
  date: Date;
  slot: string;
  email: string;
  questions: Record<string, string>;
  recurrence?: RecurrencePattern;
  calendar?: {
    provider: CalendarProvider['type'];
    addToCalendar: boolean;
  };
  reminders: {
    email: boolean;
    notification: boolean;
    timing: number; // minutes before appointment
  };
} 
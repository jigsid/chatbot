import { AppointmentTimeSlots } from '@/types/appointment'

export const APPOINTMENT_TIME_SLOTS: AppointmentTimeSlots[] = [
  { slot: '9:00am' },
  { slot: '9:30am' },
  { slot: '10:00am' },
  { slot: '10:30am' },
  { slot: '11:00am' },
  { slot: '11:30am' },
  { slot: '1:00pm' },
  { slot: '1:30pm' },
  { slot: '2:00pm' },
  { slot: '2:30pm' },
  { slot: '3:00pm' },
  { slot: '3:30pm' },
  { slot: '4:00pm' },
  { slot: '4:30pm' },
  { slot: '5:00pm' },
  { slot: '5:30pm' }
]

// Export time slots as string array for use in UI components
export const AVAILABLE_TIME_SLOTS = APPOINTMENT_TIME_SLOTS.map(item => item.slot)

// Add timezone support
export const getLocalTimeSlot = (slot: string, timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone): string => {
  const [time, meridian] = slot.split(/(?=[ap]m)/i);
  const [hours, minutes] = time.split(':');
  
  const date = new Date();
  date.setHours(
    meridian.toLowerCase() === 'pm' && hours !== '12' 
      ? parseInt(hours) + 12 
      : parseInt(hours),
    parseInt(minutes)
  );

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: timezone
  }).format(date);
}

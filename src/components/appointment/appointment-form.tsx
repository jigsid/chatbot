'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { AVAILABLE_TIME_SLOTS } from '@/constants/timeslots'
import { useToast } from '@/components/ui/use-toast'
import { Plus } from 'lucide-react'

export default function AppointmentForm() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [domainId, setDomainId] = useState('');
  const { toast } = useToast();

  // Get the current domain ID
  useEffect(() => {
    const fetchDomainId = async () => {
      try {
        // Get the first domain associated with the user
        const response = await fetch('/api/domains');
        const data = await response.json();
        if (data.domains && data.domains.length > 0) {
          setDomainId(data.domains[0].id);
        }
      } catch (error) {
        console.error("Error fetching domain ID:", error);
      }
    };
    
    fetchDomainId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !date || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create an appointment.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the booking directly without using customer ID
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          date: date.toISOString(),
          slot: timeSlot,
          domainId: domainId || undefined
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Appointment created successfully",
        });
        
        // Reset form and close dialog
        setEmail('');
        setDate(undefined);
        setTimeSlot('');
        setIsDialogOpen(false);
        
        // Refresh the page to show the new appointment
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create appointment",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="w-4 h-4" /> Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Appointment</DialogTitle>
          <DialogDescription>
            Add a new appointment to your calendar. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              className="col-span-3" 
              placeholder="customer@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time Slot
            </Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
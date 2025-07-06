'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'

export const onDomainCustomerResponses = async (customerId: string) => {
  try {
    const customerQuestions = await client.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    })

    if (customerQuestions) {
      return customerQuestions
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllDomainBookings = async (domainId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        domainId,
      },
      select: {
        slot: true,
        date: true,
      },
    })

    if (bookings) {
      return bookings
    }
  } catch (error) {
    console.log(error)
  }
}

export const onBookNewAppointment = async (
  domainId: string,
  customerId: string,
  slot: string,
  date: string,
  email: string
) => {
  try {
    // Parse the ISO string to a Date object that Prisma can handle
    const parsedDate = new Date(date);
    
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date format:', date);
      return { status: 400, message: 'Invalid date format' };
    }
    
    const booking = await client.customer.update({
      where: {
        id: customerId,
      },
      data: {
        booking: {
          create: {
            domainId,
            slot,
            date: parsedDate,
            email,
          },
        },
      },
    })

    if (booking) {
      return { status: 200, message: 'Booking created successfully' }
    } else {
      return { status: 500, message: 'Failed to create booking' }
    }
  } catch (error) {
    console.error('Error creating booking:', error)
    return { status: 500, message: 'An error occurred while creating the booking' }
  }
}

export const saveAnswers = async (
  questions: [question: string],
  customerId: string
) => {
  try {
    // Validate customerId
    if (!customerId) {
      return {
        status: 400,
        message: 'Customer ID is required',
      }
    }
    
    // Check if there are any questions to save
    if (Object.keys(questions).length === 0) {
      return {
        status: 200,
        message: 'No questions to update',
      }
    }
    
    // Update each question
    for (const question in questions) {
      await client.customer.update({
        where: { id: customerId },
        data: {
          questions: {
            update: {
              where: {
                id: question,
              },
              data: {
                answered: questions[question],
              },
            },
          },
        },
      })
    }
    
    return {
      status: 200,
      message: 'Updated Responses',
    }
  } catch (error) {
    console.error('Error saving answers:', error)
    return {
      status: 500,
      message: 'Failed to update responses',
    }
  }
}

export const onGetAllBookingsForCurrentUser = async (clerkId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId,
            },
          },
        },
      },
      select: {
        id: true,
        slot: true,
        createdAt: true,
        date: true,
        email: true,
        domainId: true,
        Customer: {
          select: {
            Domain: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (bookings) {
      return {
        bookings,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUserAppointments = async () => {
  try {
    const user = await currentUser()
    if (user) {
      const bookings = await client.bookings.count({
        where: {
          Customer: {
            Domain: {
              User: {
                clerkId: user.id,
              },
            },
          },
        },
      })

      if (bookings) {
        return bookings
      }
    }
  } catch (error) {
    console.log(error)
  }
}

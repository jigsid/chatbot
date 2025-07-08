import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { email, date, slot, domainId } = await req.json();

    // Validate required fields
    if (!email || !date || !slot) {
      return NextResponse.json(
        { message: 'Email, date, and time slot are required' },
        { status: 400 }
      );
    }

    // Parse the date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { message: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Get the user's domain if not provided
    let targetDomainId = domainId;
    if (!targetDomainId) {
      const userDomains = await client.domain.findFirst({
        where: {
          User: {
            clerkId: user.id
          }
        },
        select: {
          id: true
        }
      });
      
      if (!userDomains) {
        return NextResponse.json(
          { message: 'No domain found for this user' },
          { status: 404 }
        );
      }
      
      targetDomainId = userDomains.id;
    }

    // Create a customer or find existing one
    let customer = await client.customer.findFirst({
      where: {
        email,
        domainId: targetDomainId
      }
    });

    if (!customer) {
      // Create new customer
      customer = await client.customer.create({
        data: {
          email,
          domainId: targetDomainId
        }
      });
    }

    // Create booking
    const booking = await client.bookings.create({
      data: {
        date: parsedDate,
        slot,
        email,
        customerId: customer.id,
        domainId: targetDomainId
      }
    });

    return NextResponse.json(
      { message: 'Appointment created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the appointment' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await client.bookings.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId: user.id,
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
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching appointments' },
      { status: 500 }
    );
  }
} 
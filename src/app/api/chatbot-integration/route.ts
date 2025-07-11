import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/prisma';
import { pusherServer } from '@/lib/utils';

// Helper function to trigger Pusher events safely
const triggerPusherEvent = async (channelId: string, eventName: string, data: any) => {
  if (!pusherServer) {
    console.warn('Pusher server not initialized, skipping event', { channelId, eventName });
    return false;
  }
  
  try {
    await pusherServer.trigger(channelId, eventName, data);
    return true;
  } catch (error) {
    console.error('Error triggering Pusher event:', error);
    return false;
  }
};

// This endpoint receives messages from external chatbot
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, message, role = 'user' } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Find customer by email
    const customer = await client.customer.findFirst({
      where: {
        email,
      },
      include: {
        chatRoom: true,
      },
    });

    if (!customer) {
      // Create new customer if not found
      const newCustomer = await client.customer.create({
        data: {
          email,
          chatRoom: {
            create: {},
          },
        },
        include: {
          chatRoom: true,
        },
      });

      // Store the message
      const chatMessage = await client.chatMessage.create({
        data: {
          message,
          role,
          chatRoomId: newCustomer.chatRoom[0].id,
        },
      });

      // Notify via Pusher
      await triggerPusherEvent(newCustomer.chatRoom[0].id, 'message', {
        message: {
          id: chatMessage.id,
          message,
          role,
          createdAt: chatMessage.createdAt,
          seen: false,
        },
      });

      return NextResponse.json({ success: true, chatRoomId: newCustomer.chatRoom[0].id });
    }

    // Store message for existing customer
    const chatMessage = await client.chatMessage.create({
      data: {
        message,
        role,
        chatRoomId: customer.chatRoom[0].id,
      },
    });

    // Notify via Pusher
    await triggerPusherEvent(customer.chatRoom[0].id, 'message', {
      message: {
        id: chatMessage.id,
        message,
        role,
        createdAt: chatMessage.createdAt,
        seen: false,
      },
    });

    return NextResponse.json({ success: true, chatRoomId: customer.chatRoom[0].id });
  } catch (error) {
    console.error('Error in chatbot integration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// This endpoint allows retrieving chat history for a specific email
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Find customer by email
    const customer = await client.customer.findFirst({
      where: {
        email,
      },
      include: {
        chatRoom: {
          include: {
            message: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({
      chatRoomId: customer.chatRoom[0]?.id,
      messages: customer.chatRoom[0]?.message || [],
    });
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
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

// This webhook receives messages from external chatbots and the embedded chatbot
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, message, role = 'assistant', chatRoomId } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // If chatRoomId is provided, use it directly (for embedded chatbot)
    if (chatRoomId) {
      // Verify the chatroom exists and belongs to this user
      const existingChatRoom = await client.chatRoom.findFirst({
        where: {
          id: chatRoomId,
          Customer: {
            email
          }
        }
      });

      if (existingChatRoom) {
        // Store the message
        const chatMessage = await client.chatMessage.create({
          data: {
            message,
            role,
            chatRoomId,
          },
        });

        // Notify via Pusher
        await triggerPusherEvent(chatRoomId, 'message', {
          message: {
            id: chatMessage.id,
            message,
            role,
            createdAt: chatMessage.createdAt,
            seen: false,
          },
        });

        return NextResponse.json({ 
          success: true, 
          chatRoomId,
          messageId: chatMessage.id
        });
      }
    }

    // Find or create customer by email
    let customer = await client.customer.findFirst({
      where: {
        email,
      },
      include: {
        chatRoom: true,
      },
    });

    if (!customer) {
      // Create new customer if not found
      customer = await client.customer.create({
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
    }

    // Ensure customer has a chat room
    if (!customer.chatRoom || customer.chatRoom.length === 0) {
      await client.customer.update({
        where: {
          id: customer.id,
        },
        data: {
          chatRoom: {
            create: {},
          },
        },
      });
      
      // Refresh customer data
      const refreshedCustomer = await client.customer.findUnique({
        where: {
          id: customer.id,
        },
        include: {
          chatRoom: true,
        },
      });
      
      if (!refreshedCustomer || !refreshedCustomer.chatRoom || refreshedCustomer.chatRoom.length === 0) {
        return NextResponse.json({ error: 'Failed to create chat room' }, { status: 500 });
      }
      
      customer = refreshedCustomer;
    }

    // Now we can be sure customer and customer.chatRoom[0] exist
    const chatRoomForMessages = customer.chatRoom[0].id;

    // Store the message
    const chatMessage = await client.chatMessage.create({
      data: {
        message,
        role,
        chatRoomId: chatRoomForMessages,
      },
    });

    // If this is a user message, generate an AI response
    if (role === 'user') {
      // Use a setTimeout to allow this request to complete first
      setTimeout(async () => {
        try {
          // Generate AI response (placeholder - replace with actual AI integration)
          const aiResponse = "Thank you for your message. A representative will be with you shortly.";
          
          // Store the AI response
          const aiMessage = await client.chatMessage.create({
            data: {
              message: aiResponse,
              role: 'assistant',
              chatRoomId: chatRoomForMessages,
            },
          });
          
          // Notify via Pusher
          await triggerPusherEvent(chatRoomForMessages, 'message', {
            message: {
              id: aiMessage.id,
              message: aiResponse,
              role: 'assistant',
              createdAt: aiMessage.createdAt,
              seen: false,
            },
          });
        } catch (error) {
          console.error('Error generating AI response:', error);
        }
      }, 100);
    }

    // Notify via Pusher
    await triggerPusherEvent(chatRoomForMessages, 'message', {
      message: {
        id: chatMessage.id,
        message,
        role,
        createdAt: chatMessage.createdAt,
        seen: false,
      },
    });

    return NextResponse.json({ 
      success: true, 
      chatRoomId: chatRoomForMessages,
      messageId: chatMessage.id
    });
  } catch (error) {
    console.error('Error in external chatbot webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
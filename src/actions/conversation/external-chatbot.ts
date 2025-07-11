'use server'

import { client } from '@/lib/prisma'
import { pusherServer } from '@/lib/utils'

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

// Configuration for external chatbot
const EXTERNAL_CHATBOT_URL = process.env.EXTERNAL_CHATBOT_URL || 'https://external-chatbot-api.example.com/messages';

// Send a message to the external chatbot
export const sendMessageToExternalChatbot = async (
  chatRoomId: string,
  message: string,
  role: 'assistant' | 'user' = 'user'
) => {
  try {
    // First, find the customer associated with this chat room
    const chatRoom = await client.chatRoom.findUnique({
      where: {
        id: chatRoomId,
      },
      include: {
        Customer: true,
      },
    });

    if (!chatRoom || !chatRoom.Customer?.email) {
      throw new Error('Chat room or customer email not found');
    }

    // Store the message in our database
    const chatMessage = await client.chatMessage.create({
      data: {
        message,
        role,
        chatRoomId,
      },
    });

    // Notify clients via Pusher
    await triggerPusherEvent(chatRoomId, 'message', {
      message: {
        id: chatMessage.id,
        message,
        role,
        createdAt: chatMessage.createdAt,
        seen: false,
      },
    });

    // Send the message to the external chatbot
    const response = await fetch(EXTERNAL_CHATBOT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: chatRoom.Customer.email,
        message,
        role,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send message to external chatbot:', response.statusText);
      // We still return success since we've stored the message in our database
    }

    return {
      success: true,
      messageId: chatMessage.id,
    };
  } catch (error) {
    console.error('Error sending message to external chatbot:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Import chat history from external chatbot
export const importChatHistoryFromExternalChatbot = async (
  email: string,
  externalChatbotApiUrl: string
) => {
  try {
    // Find or create customer by email
    let customer = await client.customer.findFirst({
      where: {
        email,
      },
      include: {
        chatRoom: true,
      },
    })

    if (!customer) {
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
      })
    }

    // Fetch chat history from external chatbot
    const response = await fetch(`${externalChatbotApiUrl}?email=${encodeURIComponent(email)}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch chat history: ${response.statusText}`)
    }

    const data = await response.json()
    const messages = data.messages || []

    // Import messages into our database
    for (const msg of messages) {
      await client.chatMessage.create({
        data: {
          message: msg.message || msg.content,
          role: msg.role,
          chatRoomId: customer.chatRoom[0].id,
          createdAt: new Date(msg.createdAt || Date.now()),
        },
      })
    }

    return {
      success: true,
      chatRoomId: customer.chatRoom[0].id,
      messageCount: messages.length,
    }
  } catch (error) {
    console.error('Error importing chat history:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
} 
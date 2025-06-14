import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from '@/lib/utils';
import { client } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Handle different message types from Vapi
    switch (message.type) {
      case 'transcript':
        // Handle transcript messages (user speech)
        if (message.role === 'user' && message.transcript && message.transcriptType === 'final') {
          // Get the chatRoomId from the message metadata if available
          const chatRoomId = message.metadata?.chatRoomId;
          
          if (!chatRoomId) {
            return NextResponse.json(
              { error: 'ChatRoom ID is required in metadata' },
              { status: 400 }
            );
          }

          // Store the user message in the database
          const chatMessage = await client.chatMessage.create({
            data: {
              message: message.transcript,
              role: 'user',
              chatRoomId,
            },
          });

          // Notify via Pusher
          await pusherServer.trigger(chatRoomId, 'message', {
            message: {
              id: chatMessage.id,
              message: message.transcript,
              role: 'user',
              createdAt: chatMessage.createdAt,
              seen: false,
            },
          });
        }
        break;

      case 'speech':
        // Handle assistant speech messages
        if (message.role === 'assistant' && message.speech) {
          const chatRoomId = message.metadata?.chatRoomId;
          
          if (!chatRoomId) {
            return NextResponse.json(
              { error: 'ChatRoom ID is required in metadata' },
              { status: 400 }
            );
          }

          // Store the assistant message in the database
          const chatMessage = await client.chatMessage.create({
            data: {
              message: message.speech,
              role: 'assistant',
              chatRoomId,
            },
          });

          // Notify via Pusher
          await pusherServer.trigger(chatRoomId, 'message', {
            message: {
              id: chatMessage.id,
              message: message.speech,
              role: 'assistant',
              createdAt: chatMessage.createdAt,
              seen: false,
            },
          });
        }
        break;

      case 'call-end':
        // Handle call end events
        console.log('Call ended:', message.call?.id);
        break;

      default:
        console.log('Unhandled message type:', message.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in Vapi webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
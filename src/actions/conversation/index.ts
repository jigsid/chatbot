'use server'

import { client } from '@/lib/prisma'
import { pusherServer } from '@/lib/utils'

export const onToggleRealtime = async (id: string, state: boolean) => {
  try {
    const chatRoom = await client.chatRoom.update({
      where: {
        id,
      },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    })

    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom.live
          ? 'Realtime mode enabled'
          : 'Realtime mode disabled',
        chatRoom,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetConversationMode = async (id: string) => {
  try {
    const mode = await client.chatRoom.findUnique({
      where: {
        id,
      },
      select: {
        live: true,
      },
    })
    console.log(mode)
    return mode
  } catch (error) {
    console.log(error)
  }
}

export const onGetDomainChatRooms = async (id: string) => {
  try {
    // Skip if id is not a valid UUID or is 'all'
    if (id === 'all') {
      // Handle the 'all' case differently - return all domains
      const domains = await client.domain.findMany({
        select: {
          customer: {
            select: {
              email: true,
              chatRoom: {
                select: {
                  createdAt: true,
                  id: true,
                  message: {
                    select: {
                      message: true,
                      createdAt: true,
                      seen: true,
                    },
                    orderBy: {
                      createdAt: 'desc',
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });
      
      // Filter out any customers with empty chatRoom arrays or invalid data
      const validCustomers = domains.flatMap(domain => 
        domain.customer.filter(customer => 
          customer.chatRoom && 
          customer.chatRoom.length > 0 && 
          customer.chatRoom[0].id
        )
      );
      
      return { customer: validCustomers };
    }
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      console.error('Invalid UUID format:', id);
      return { customer: [] };
    }

    const domains = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        customer: {
          select: {
            email: true,
            chatRoom: {
              select: {
                createdAt: true,
                id: true,
                message: {
                  select: {
                    message: true,
                    createdAt: true,
                    seen: true,
                  },
                  orderBy: {
                    createdAt: 'desc',
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    })

    if (domains && domains.customer) {
      // Filter out any customers with empty chatRoom arrays or invalid data
      const validCustomers = domains.customer.filter(customer => 
        customer.chatRoom && 
        customer.chatRoom.length > 0 && 
        customer.chatRoom[0].id
      );
      
      return { customer: validCustomers };
    }
    return { customer: [] };
  } catch (error) {
    console.log(error)
    return { customer: [] };
  }
}

export const onGetChatMessages = async (id: string) => {
  try {
    const messages = await client.chatRoom.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        live: true,
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (messages) {
      return messages
    }
  } catch (error) {
    console.log(error)
  }
}

export const onViewUnReadMessages = async (id: string) => {
  try {
    await client.chatMessage.updateMany({
      where: {
        chatRoomId: id,
      },
      data: {
        seen: true,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const onRealTimeChat = async (
  chatroomId: string,
  message: string,
  id: string,
  role: 'assistant' | 'user'
) => {
  console.log('Triggering realtime-mode event:', { chatroomId, message, id, role });
  
  if (!pusherServer) {
    console.warn('Pusher server not initialized, skipping realtime chat event');
    return false;
  }
  
  try {
    await pusherServer.trigger(chatroomId, 'realtime-mode', {
      chat: {
        message,
        id,
        role,
        timestamp: Date.now(),
      },
    });
    console.log('Successfully triggered realtime-mode event');
    return true;
  } catch (error) {
    console.error('Error triggering realtime-mode event:', error);
    return false;
  }
}

export const onOwnerSendMessage = async (
  chatroom: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  try {
    const chat = await client.chatRoom.update({
      where: {
        id: chatroom,
      },
      data: {
        message: {
          create: {
            message,
            role,
          },
        },
      },
      select: {
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    })

    if (chat) {
      return chat
    }
  } catch (error) {
    console.log(error)
  }
}

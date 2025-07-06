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
      
      return { customer: domains.flatMap(domain => domain.customer) };
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

    if (domains) {
      return domains
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
  } catch (error) {
    console.error('Error triggering realtime-mode event:', error);
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

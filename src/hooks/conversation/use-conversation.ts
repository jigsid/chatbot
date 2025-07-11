import {
  onGetChatMessages,
  onGetDomainChatRooms,
  onOwnerSendMessage,
  onViewUnReadMessages,
} from '@/actions/conversation'
import { useChatContext } from '@/context/user-chat-context'
import { getMonthName, pusherClient } from '@/lib/utils'
import {
  ChatBotMessageSchema,
  ConversationSearchSchema,
} from '@/schemas/conversation.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { sendMessageToExternalChatbot } from '@/actions/conversation/external-chatbot'

export const useConversation = () => {
  const { register, watch, setValue } = useForm({
    resolver: zodResolver(ConversationSearchSchema),
    mode: 'onChange',
  })
  const { setLoading: loadMessages, setChats, setChatRoom } = useChatContext()
  const [chatRooms, setChatRooms] = useState<
    {
      chatRoom: {
        id: string
        createdAt: Date
        message: {
          message: string
          createdAt: Date
          seen: boolean
        }[]
      }[]
      email: string | null
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const search = watch(async (value) => {
      if (!value.domain) return;
      setLoading(true)
      try {
        const rooms = await onGetDomainChatRooms(value.domain)
        if (rooms) {
          setLoading(false)
          setChatRooms(rooms.customer)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    })
    return () => search.unsubscribe()
  }, [watch])

  const onGetActiveChatMessages = async (id: string | undefined) => {
    if (!id) {
      console.error('Cannot get messages: Chat room ID is undefined');
      return;
    }
    
    try {
      loadMessages(true)
      const messages = await onGetChatMessages(id)
      if (messages) {
        setChatRoom(id)
        loadMessages(false)
        // Ensure each message has both message and content properties
        const formattedMessages = messages[0]?.message?.map((msg: { 
          id: string; 
          role: 'assistant' | 'user' | null;
          message?: string;
          content?: string;
          createdAt: Date;
          seen: boolean;
        }) => ({
          ...msg,
          content: msg.message || msg.content || '',
          message: msg.message || msg.content || ''
        })) || [];
        setChats(formattedMessages)
      } else {
        // If no messages found, still set the chat room but with empty messages
        setChatRoom(id)
        setChats([])
        loadMessages(false)
      }
    } catch (error) {
      console.log(error)
      loadMessages(false)
    }
  }

  return {
    register,
    chatRooms,
    loading,
    onGetActiveChatMessages,
    setValue
  }
}

export const useChatTime = (createdAt: Date, roomId: string) => {
  const { chatRoom } = useChatContext()
  const [messageSentAt, setMessageSentAt] = useState<string>('')
  const [urgent, setUrgent] = useState<boolean>(false)

  const onSetMessageRecievedDate = () => {
    if (!createdAt) {
      setMessageSentAt('');
      return;
    }
    
    try {
      const dt = new Date(createdAt)
      const current = new Date()
      const currentDate = current.getDate()
      const hr = dt.getHours()
      const min = dt.getMinutes()
      const date = dt.getDate()
      const month = dt.getMonth()
      const difference = currentDate - date

      if (difference <= 0) {
        setMessageSentAt(`${hr}:${min < 10 ? '0' + min : min}${hr >= 12 ? 'PM' : 'AM'}`)
        if (current.getHours() - dt.getHours() < 2) {
          setUrgent(true)
        }
      } else {
        setMessageSentAt(`${date} ${getMonthName(month)}`)
      }
    } catch (error) {
      console.error('Error processing date:', error);
      setMessageSentAt('');
    }
  }

  const onSeenChat = async () => {
    if (chatRoom == roomId && urgent) {
      try {
        await onViewUnReadMessages(roomId)
        setUrgent(false)
      } catch (error) {
        console.error('Error marking chat as seen:', error);
      }
    }
  }

  useEffect(() => {
    onSeenChat()
  }, [chatRoom])

  useEffect(() => {
    onSetMessageRecievedDate()
  }, [])

  return { messageSentAt, urgent, onSeenChat }
}

export const useChatWindow = () => {
  const messageWindowRef = useRef<HTMLDivElement | null>(null)
  const [chats, setChats] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [chatRoomInfo, setChatRoomInfo] = useState<{id: string; createdAt?: Date} | undefined>()
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const [isTyping, setIsTyping] = useState(false)
  const [readStatus, setReadStatus] = useState<Record<string, 'sent' | 'delivered' | 'read'>>({})
  const [retryCount, setRetryCount] = useState<Record<string, number>>({})
  const { toast } = useToast()
  const { chatRoom: contextChatRoom, chats: contextChats, setChatRoom: setContextChatRoom } = useChatContext()
  
  // Access to the chatRooms state for email lookup
  const [chatRooms, setChatRooms] = useState<any[]>([])
  
  // Sync chatRoom with context
  useEffect(() => {
    try {
      if (contextChatRoom) {
        setChatRoomInfo({id: contextChatRoom, createdAt: new Date()})
      } else {
        setChatRoomInfo(undefined)
      }
    } catch (error) {
      console.error('Error syncing chat room with context:', error)
    }
  }, [contextChatRoom])

  // Get customer email from chats
  useEffect(() => {
    try {
      if (contextChats && contextChats.length > 0) {
        // Find the first user message to get the email
        const userMessage = contextChats.find(chat => chat && chat.role === 'user')
        if (userMessage && 'email' in userMessage) {
          setCustomerEmail(userMessage.email as string)
        } else if (chatRooms && chatRooms.length > 0) {
          // Try to find the email from chatRooms
          const room = chatRooms.find(r => r && r.chatRoom && r.chatRoom[0] && r.chatRoom[0].id === contextChatRoom)
          if (room && room.email) {
            setCustomerEmail(room.email)
          }
        }
      }
    } catch (error) {
      console.error('Error getting customer email:', error)
    }
  }, [contextChats, contextChatRoom, chatRooms])

  // Sync chats with context
  useEffect(() => {
    if (contextChats && Array.isArray(contextChats)) {
      setChats(contextChats)
    }
  }, [contextChats])

  // Fetch chat rooms to get email information
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await onGetDomainChatRooms('all')
        if (rooms && rooms.customer) {
          setChatRooms(rooms.customer)
          
          // If we have a chatRoom but no email yet, try to find it
          if (chatRoomInfo?.id && !customerEmail) {
            const room = rooms.customer.find(r => r && r.chatRoom && r.chatRoom[0] && r.chatRoom[0].id === chatRoomInfo.id)
            if (room && room.email) {
              setCustomerEmail(room.email)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching chat rooms:', error)
      }
    }
    
    fetchChatRooms()
  }, [chatRoomInfo?.id, customerEmail])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight
    }
  }, [chats])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChatBotMessageSchema),
  })

  // Handle real-time message updates
  useEffect(() => {
    if (!chatRoomInfo?.id || !pusherClient) return
    
    console.log('Conversation: Subscribing to channel:', chatRoomInfo.id);
    
    // Create a function to handle subscription errors
    const connectToPusher = () => {
      try {
        // First check if the channel already exists to avoid duplicate subscriptions
        const existingChannel = pusherClient?.channel(chatRoomInfo.id);
        
        if (existingChannel) {
          console.log('Channel already exists, unsubscribing first...');
          pusherClient?.unsubscribe(chatRoomInfo.id);
        }
        
        console.log('Subscribing to new channel...');
        const channel = pusherClient?.subscribe(chatRoomInfo.id);
        
        if (!channel) {
          console.error('Failed to subscribe to channel');
          return;
        }

        const processedMessages = new Set<string>();
        
        // Listen for regular messages
        channel.bind('message', (data: any) => {
          try {
            console.log('Conversation: Received message event:', data);
            
            if (!data || !data.message) {
              console.warn('Conversation: Invalid message data received');
              return;
            }
            
            // Ensure the message has both message and content properties
            const messageData = {
              ...data.message,
              content: data.message.message || data.message.content || '',
              message: data.message.message || data.message.content || ''
            }
            
            // Create a unique identifier for this message
            const messageIdentifier = `${messageData.id}-${messageData.content}-${messageData.role}`;
            
            // Only process if we haven't seen this message before
            if (!processedMessages.has(messageIdentifier)) {
              processedMessages.add(messageIdentifier);
              
              // Check if the message already exists in the chat
              setChats(prev => {
                if (!Array.isArray(prev)) {
                  // Initialize with an empty array if prev is not an array
                  return [messageData];
                }
                
                const messageExists = prev.some(msg => 
                  msg && (
                    msg.id === messageData.id || 
                    (msg.content === messageData.content && 
                     msg.role === messageData.role &&
                     Math.abs(new Date(msg.createdAt || Date.now()).getTime() - new Date(messageData.createdAt || Date.now()).getTime()) < 1000)
                  )
                );
                
                if (messageExists) {
                  console.log('Conversation: Skipping duplicate message:', messageData.content);
                  return prev;
                }
                
                console.log('Conversation: Adding new message to chat');
                return [...prev, messageData];
              });
              
              if (messageData.id) {
                setReadStatus(prev => ({ ...prev, [messageData.id]: 'delivered' }))
                setTimeout(() => {
                  setReadStatus(prev => ({ ...prev, [messageData.id]: 'read' }))
                }, 2000)
              }
            }
          } catch (error) {
            console.error('Conversation: Error processing message event:', error);
          }
        });
        
        // Listen for real-time mode messages as well
        channel.bind('realtime-mode', (data: any) => {
          try {
            console.log('Conversation: Received realtime-mode event:', data);
            
            if (!data?.chat?.message) {
              console.warn('Conversation: Invalid realtime message format:', data);
              return;
            }
            
            // Create a message object from realtime data
            const messageData = {
              id: data.chat.id || `realtime-${Date.now()}`,
              role: data.chat.role,
              content: data.chat.message,
              message: data.chat.message,
              createdAt: new Date(),
              seen: false
            };
            
            // Create a unique identifier for this message
            const messageIdentifier = `${messageData.role}-${messageData.content}-${Date.now()}`;
            
            // Only process if we haven't seen this message before
            if (!processedMessages.has(messageIdentifier)) {
              processedMessages.add(messageIdentifier);
              
              // Check if the message already exists in the chat
              setChats(prev => {
                if (!Array.isArray(prev)) {
                  return [messageData];
                }
                
                const messageExists = prev.some(msg => 
                  msg && (
                    (msg.content === messageData.content && 
                     msg.role === messageData.role)
                  )
                );
                
                if (messageExists) {
                  console.log('Conversation: Skipping duplicate realtime message:', messageData.content);
                  return prev;
                }
                
                console.log('Conversation: Adding new realtime message to chat');
                return [...prev, messageData];
              });
            }
          } catch (error) {
            console.error('Conversation: Error processing realtime-mode event:', error);
          }
        });

        channel.bind('typing', () => {
          setIsTyping(true)
          setTimeout(() => setIsTyping(false), 3000)
        })
        
        // Update event handlers for pusher connection errors
        pusherClient?.connection.bind('error', (err: any) => {
          console.error('Conversation: Pusher connection error:', err);
          // You may want to implement reconnect logic here
        });

        pusherClient?.connection.bind('disconnected', () => {
          console.log('Conversation: Pusher disconnected');
          // You may want to implement reconnect logic here
        });
        
        return channel;
      } catch (error) {
        console.error('Conversation: Error subscribing to Pusher channel:', error);
        return null;
      }
    };
    
    const channel = connectToPusher();

    return () => {
      try {
        console.log('Conversation: Unsubscribing from channel:', chatRoomInfo.id);
        if (channel) {
          channel.unbind_all();
        }
        pusherClient?.unsubscribe(chatRoomInfo.id);
      } catch (error) {
        console.error('Conversation: Error unsubscribing from Pusher channel:', error);
      }
    }
  }, [chatRoomInfo?.id])

  const retryMessage = async (messageId: string) => {
    try {
      const message = chats.find(chat => chat.id === messageId)
      if (!message || !chatRoomInfo?.id) return

      const currentRetries = retryCount[messageId] || 0
      if (currentRetries >= 3) {
        toast({
          title: 'Error',
          description: 'Maximum retry attempts reached',
          variant: 'destructive',
        })
        return
      }

      setRetryCount(prev => ({ ...prev, [messageId]: currentRetries + 1 }))
      const messageContent = message.message || message.content
      await onOwnerSendMessage(chatRoomInfo.id, messageContent, message.role)
      
      setReadStatus(prev => ({ ...prev, [messageId]: 'sent' }))
      setTimeout(() => {
        setReadStatus(prev => ({ ...prev, [messageId]: 'delivered' }))
      }, 1000)
    } catch (error) {
      console.error('Retry failed:', error)
      toast({
        title: 'Error',
        description: 'Failed to retry sending message',
        variant: 'destructive',
      })
    }
  }

  // Modified onHandleSentMessage to always use external chatbot integration
  const onHandleSentMessage = handleSubmit(async (values) => {
    try {
      if (!values.content && !values.file) return
      if (!chatRoomInfo?.id) return
      
      const messageId = Date.now().toString()
      
      // Create local message object
      const newMessage = {
        id: messageId,
        role: 'assistant' as const,
        content: values.content,
        message: values.content,
        createdAt: new Date(),
        seen: false,
      }
      
      // Add to local state immediately for optimistic UI update
      setChats(prev => [...prev, newMessage])
      setReadStatus(prev => ({ ...prev, [messageId]: 'sent' }))
      
      // Reset the form
      reset()
      
      // Check if this is an embedded chat (chatRoomId starts with 'embedded-')
      if (chatRoomInfo.id.startsWith('embedded-')) {
        // Send message via external chatbot integration
        await sendMessageToExternalChatbot(
          chatRoomInfo.id,
          values.content,
          'assistant'
        )
      } else {
        // Send via regular channel
        await onOwnerSendMessage(chatRoomInfo.id, values.content, 'assistant')
      }
      
      // Update status after successful send
      setTimeout(() => {
        setReadStatus(prev => ({ ...prev, [messageId]: 'delivered' }))
      }, 1000)
    } catch (error) {
      console.error('Send message failed:', error)
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      })
    }
  })

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // File upload implementation...
    console.log('File upload not implemented yet')
  }

  return {
    messageWindowRef,
    chats,
    loading,
    chatRoom: chatRoomInfo,
    onHandleSentMessage,
    register,
    isTyping,
    readStatus,
    onFileUpload,
    retryMessage,
    customerEmail
  }
}

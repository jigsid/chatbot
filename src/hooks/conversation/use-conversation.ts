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

  const onGetActiveChatMessages = async (id: string) => {
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
  const [messageSentAt, setMessageSentAt] = useState<string>()
  const [urgent, setUrgent] = useState<boolean>(false)

  const onSetMessageRecievedDate = () => {
    const dt = new Date(createdAt)
    const current = new Date()
    const currentDate = current.getDate()
    const hr = dt.getHours()
    const min = dt.getMinutes()
    const date = dt.getDate()
    const month = dt.getMonth()
    const difference = currentDate - date

    if (difference <= 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? 'PM' : 'AM'}`)
      if (current.getHours() - dt.getHours() < 2) {
        setUrgent(true)
      }
    } else {
      setMessageSentAt(`${date} ${getMonthName(month)}`)
    }
  }

  const onSeenChat = async () => {
    if (chatRoom == roomId && urgent) {
      await onViewUnReadMessages(roomId)
      setUrgent(false)
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
    if (contextChatRoom) {
      setChatRoomInfo({id: contextChatRoom, createdAt: new Date()})
    }
  }, [contextChatRoom])

  // Get customer email from chats
  useEffect(() => {
    if (contextChats && contextChats.length > 0) {
      // Find the first user message to get the email
      const userMessage = contextChats.find(chat => chat.role === 'user')
      if (userMessage && userMessage.email) {
        setCustomerEmail(userMessage.email)
      } else if (chatRooms.length > 0) {
        // Try to find the email from chatRooms
        const room = chatRooms.find(r => r.chatRoom[0].id === contextChatRoom)
        if (room && room.email) {
          setCustomerEmail(room.email)
        }
      }
    }
  }, [contextChats, contextChatRoom, chatRooms])

  // Fetch chat rooms to get email information
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await onGetDomainChatRooms('all')
        if (rooms && rooms.customer) {
          setChatRooms(rooms.customer)
          
          // If we have a chatRoom but no email yet, try to find it
          if (chatRoomInfo?.id && !customerEmail) {
            const room = rooms.customer.find(r => r.chatRoom[0].id === chatRoomInfo.id)
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
    if (!chatRoomInfo?.id) return

    const channel = pusherClient.subscribe(chatRoomInfo.id)
    
    channel.bind('message', (data: any) => {
      // Ensure the message has both message and content properties
      const messageData = {
        ...data.message,
        content: data.message.message || data.message.content,
        message: data.message.message || data.message.content
      }
      setChats(prev => [...prev, messageData])
      setReadStatus(prev => ({ ...prev, [messageData.id]: 'delivered' }))
      setTimeout(() => {
        setReadStatus(prev => ({ ...prev, [messageData.id]: 'read' }))
      }, 2000)
    })

    channel.bind('typing', () => {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 3000)
    })

    return () => {
      channel.unbind_all()
      pusherClient.unsubscribe(chatRoomInfo.id)
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
        role: 'assistant',
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
        await onOwnerSendMessage(chatRoomInfo.id, values.content)
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

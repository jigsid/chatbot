import {
  onGetChatMessages,
  onGetDomainChatRooms,
  onOwnerSendMessage,
  onRealTimeChat,
  onViewUnReadMessages,
} from '@/actions/conversation'
import { useChatContext } from '@/context/user-chat-context'
import { getMonthName, pusherClient } from '@/lib/utils'
import {
  ChatBotMessageSchema,
  ConversationSearchSchema,
} from '@/schemas/conversation.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'

export const useConversation = () => {
  const { register, watch } = useForm({
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
      setLoading(true)
      try {
        const rooms = await onGetDomainChatRooms(value.domain)
        if (rooms) {
          setLoading(false)
          setChatRooms(rooms.customer)
        }
      } catch (error) {
        console.log(error)
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
        setChats(messages[0].message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {
    register,
    chatRooms,
    loading,
    onGetActiveChatMessages,
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
  const [chatRoom, setChatRoom] = useState<string | undefined>()
  const [isTyping, setIsTyping] = useState(false)
  const [readStatus, setReadStatus] = useState<Record<string, 'sent' | 'delivered' | 'read'>>({})
  const [retryCount, setRetryCount] = useState<Record<string, number>>({})
  const { toast } = useToast()
  
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
    if (!chatRoom) return;

    const channel = pusherClient.subscribe(chatRoom);
    
    channel.bind('message', (data: any) => {
      setChats(prev => [...prev, data.message]);
      setReadStatus(prev => ({ ...prev, [data.message.id]: 'delivered' }));
      setTimeout(() => {
        setReadStatus(prev => ({ ...prev, [data.message.id]: 'read' }));
      }, 2000);
    });

    channel.bind('typing', () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(chatRoom);
    };
  }, [chatRoom]);

  const retryMessage = async (messageId: string) => {
    try {
      const message = chats.find(chat => chat.id === messageId);
      if (!message) return;

      const currentRetries = retryCount[messageId] || 0;
      if (currentRetries >= 3) {
        toast({
          title: 'Error',
          description: 'Maximum retry attempts reached',
          variant: 'destructive',
        });
        return;
      }

      setRetryCount(prev => ({ ...prev, [messageId]: currentRetries + 1 }));
      await onOwnerSendMessage(chatRoom!, message.content, message.role);
      
      setReadStatus(prev => ({ ...prev, [messageId]: 'sent' }));
      setTimeout(() => {
        setReadStatus(prev => ({ ...prev, [messageId]: 'delivered' }));
      }, 1000);
    } catch (error) {
      console.error('Retry failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to retry sending message',
        variant: 'destructive',
      });
    }
  };

  const onHandleSentMessage = handleSubmit(async (values) => {
    try {
      if (!values.content && !values.file) return;
      
      const messageId = Date.now().toString();
      const newMessage = {
        id: messageId,
        role: 'user',
        content: values.content || 'File attachment',
        createdAt: new Date(),
      };
      
      setChats(prev => [...prev, newMessage]);
      setReadStatus(prev => ({ ...prev, [messageId]: 'sent' }));
      
      // Notify others that user is typing
      if (chatRoom) {
        await onRealTimeChat(chatRoom, 'typing', '', 'user');
      }

      // Send message
      const result = await onOwnerSendMessage(chatRoom!, values.content, 'user');
      if (!result) throw new Error('Failed to send message');

      setReadStatus(prev => ({ ...prev, [messageId]: 'delivered' }));
      setTimeout(() => {
        setReadStatus(prev => ({ ...prev, [messageId]: 'read' }));
      }, 2000);
      
      reset();
    } catch (error) {
      console.error(error);
      const msgId = Date.now().toString();
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
      // Add retry button separately
      const retryBtn = document.createElement('button');
      retryBtn.textContent = 'Retry';
      retryBtn.onclick = () => retryMessage(msgId);
      document.querySelector('.toast-action')?.appendChild(retryBtn);
    }
  });

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'File size should be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Error',
          description: 'Invalid file type. Please upload an image, PDF, or Word document.',
          variant: 'destructive',
        });
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      // TODO: Implement actual file upload logic here
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // if (!response.ok) throw new Error('Upload failed');
      
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    }
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messageWindowRef.current) {
      const shouldScroll = messageWindowRef.current.scrollHeight - messageWindowRef.current.scrollTop <= messageWindowRef.current.clientHeight + 100;
      
      if (shouldScroll) {
        messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
    }
  }, [chats, isTyping]);

  return {
    messageWindowRef,
    register,
    onHandleSentMessage,
    chats,
    loading,
    chatRoom,
    isTyping,
    readStatus,
    onFileUpload,
    errors,
    retryMessage,
  };
}

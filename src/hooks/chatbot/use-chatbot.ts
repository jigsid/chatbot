import { onAiChatBotAssistant, onGetCurrentChatBot } from '@/actions/bot'
import { postToParent, pusherClient } from '@/lib/utils'
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from '@/schemas/conversation.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { UploadClient } from '@uploadcare/upload-client'

import { useForm } from 'react-hook-form'

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useChatBot = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
  })
  const [currentBot, setCurrentBot] = useState<
    | {
        name: string
        chatBot: {
          id: string
          icon: string | null
          welcomeMessage: string | null
          background: string | null
          textColor: string | null
          helpdesk: boolean
        } | null
        helpdesk: {
          id: string
          question: string
          answer: string
          domainId: string | null
        }[]
      }
    | undefined
  >()
  const messageWindowRef = useRef<HTMLDivElement | null>(null)
  const [botOpened, setBotOpened] = useState<boolean>(false)
  const openTimer = useRef<number | null>(null)

  const postFrameSize = (open: boolean) => {
    postToParent(
      JSON.stringify({
        type: 'SMARTREP_RESIZE',
        width: open ? 400 : 80,
        height: open ? 680 : 80,
      })
    )
  }

  const onOpenChatBot = () => {
    if (openTimer.current) {
      window.clearTimeout(openTimer.current)
    }

    if (!botOpened) {
      postFrameSize(true)
      openTimer.current = window.setTimeout(() => {
        setBotOpened(true)
      }, 40)
      return
    }

    setBotOpened(false)
    openTimer.current = window.setTimeout(() => {
      postFrameSize(false)
    }, 220)
  }
  const [loading, setLoading] = useState<boolean>(false)
  const [onChats, setOnChats] = useState<
    { role: 'assistant' | 'user'; content: string; link?: string }[]
  >([])
  const [onAiTyping, setOnAiTyping] = useState<boolean>(false)
  const [currentBotId, setCurrentBotId] = useState<string>()
  const [onRealTime, setOnRealTime] = useState<
    { chatroom: string; mode: boolean } | undefined
  >(undefined)

  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    onScrollToBottom()
  }, [onChats, messageWindowRef])

  useEffect(() => {
    postToParent(
      JSON.stringify({
        type: 'SMARTREP_RESIZE',
        width: botOpened ? 400 : 80,
        height: botOpened ? 680 : 80,
      })
    )
  }, [botOpened])

  useEffect(() => {
    return () => {
      if (openTimer.current) {
        window.clearTimeout(openTimer.current)
      }
    }
  }, [])

  const applyPreviewBot = () => {
    setCurrentBotId((prev) => prev || 'preview')
    setCurrentBot((prev) =>
      prev || {
        name: 'SmartRep AI',
        chatBot: {
          id: 'preview',
          icon: null,
          welcomeMessage: 'Hi! How can I help you today?',
          background: '#0B1F3A',
          textColor: '#0f172a',
          helpdesk: false,
        },
        helpdesk: [],
      }
    )
    setOnChats((prev) =>
      prev.length
        ? prev
        : [
            {
              role: 'assistant',
              content: 'Hi! How can I help you today?',
            },
          ]
    )
    setLoading(false)
  }

  const loadedBotId = useRef<string | null>(null)

  const onGetDomainChatBot = async (id: string) => {
    if (loadedBotId.current === id) return
    loadedBotId.current = id
    setLoading(true)
    setCurrentBotId(id)
    try {
      const chatbot = await onGetCurrentChatBot(id)
      if (chatbot) {
        setOnChats((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              chatbot.chatBot?.welcomeMessage || 'Hi! How can I help you today?',
          },
        ])
        setCurrentBot(chatbot)
        setLoading(false)
        return
      }
    } catch (error) {
      console.error('Failed to load chatbot', error)
    }
    applyPreviewBot()
  }

  useEffect(() => {
    const isUuid = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      )

    const handleMessage = (e: MessageEvent) => {
      const payload = e.data
      const botid =
        typeof payload === 'string'
          ? payload
          : payload && typeof payload === 'object'
            ? payload.id || payload.botId
            : undefined

      if (typeof botid === 'string' && isUuid(botid)) {
        onGetDomainChatBot(botid)
      }
    }

    window.addEventListener('message', handleMessage)

    const timeout = window.setTimeout(() => {
      applyPreviewBot()
    }, 800)

    return () => {
      window.removeEventListener('message', handleMessage)
      window.clearTimeout(timeout)
    }
  }, [])

  const onStartChatting = handleSubmit(async (values) => {
    console.log('ALL VALUES', values)
    
    // Store values before they get reset
    const imageFile = values.image?.[0];
    const contentText = values.content;

    if (imageFile) {
      console.log('IMAGE fROM ', imageFile)
      const uploaded = await upload.uploadFile(imageFile)
      if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: 'user',
            content: uploaded.uuid,
          },
        ])
      }

      console.log('🟡 RESPONSE FROM UC', uploaded.uuid)
      setOnAiTyping(true)
      
      try {
        // Use the new API route
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentBotId || 'preview',
            chat: onChats,
            author: 'user',
            message: uploaded.uuid
          }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.response) {
          setOnAiTyping(false);
          if (data.live) {
            setOnRealTime((prev) => ({
              ...prev,
              chatroom: data.chatRoom,
              mode: data.live,
            }));
          } else {
            setOnChats((prev: any) => [...prev, data.response]);
          }
        } else {
          console.error('Error from chatbot API:', data.error);
          setOnAiTyping(false);
          setOnChats((prev: any) => [
            ...prev, 
            { 
              role: 'assistant', 
              content: 'I apologize, but I encountered an error. Please try again later.' 
            }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch chatbot response:', error);
        setOnAiTyping(false);
        setOnChats((prev: any) => [
          ...prev, 
          { 
            role: 'assistant', 
            content: 'I apologize, but I encountered an error. Please try again later.' 
          }
        ]);
      }
    }

    if (contentText) {
      if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: 'user',
            content: contentText,
          },
        ])
      }

      setOnAiTyping(true)

      try {
        // Use the new API route
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentBotId || 'preview',
            chat: onChats,
            author: 'user',
            message: contentText
          }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.response) {
          setOnAiTyping(false);
          if (data.live) {
            setOnRealTime((prev) => ({
              ...prev,
              chatroom: data.chatRoom,
              mode: data.live,
            }));
          } else {
            setOnChats((prev: any) => [...prev, data.response]);
          }
        } else {
          console.error('Error from chatbot API:', data.error);
          setOnAiTyping(false);
          setOnChats((prev: any) => [
            ...prev, 
            { 
              role: 'assistant', 
              content: 'I apologize, but I encountered an error. Please try again later.' 
            }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch chatbot response:', error);
        setOnAiTyping(false);
        setOnChats((prev: any) => [
          ...prev, 
          { 
            role: 'assistant', 
            content: 'I apologize, but I encountered an error. Please try again later.' 
          }
        ]);
      }
    }
    
    // Reset form immediately after capturing values
    reset();
  })
  
  // No need for the useEffect reset anymore as we're handling it directly in the submit handler

  return {
    botOpened,
    onOpenChatBot,
    onStartChatting,
    onChats,
    register,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    setOnChats,
    onRealTime,
    errors,
  }
}

export const useRealTime = (
  chatRoom: string,
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant'
        content: string
        link?: string | undefined
      }[]
    >
  >
) => {
  const [liveChat, setLiveChat] = useState<boolean>(false)

  useEffect(() => {
    if (!pusherClient || !chatRoom) return;
    
    try {
      console.log('SETTING UP REALTIME MODE WITH', chatRoom)
      pusherClient.subscribe(chatRoom);
      
      pusherClient.bind('realtime-mode', (data: any) => {
        console.log('PUSHER EVENTS', data)
        if (data.status == 'offline') {
          pusherClient?.unbind('realtime-mode');
          pusherClient?.unsubscribe(chatRoom);
          setLiveChat(false)
        } else if (data.mode) {
          setLiveChat(data.mode)
        } else {
          setLiveChat(false)
          if (data.role) {
            setChats((prev) => [
              ...prev,
              {
                role: data.role,
                content: data.content,
              },
            ])
          }
        }
      })
    } catch (error) {
      console.error('Error setting up real-time chat:', error);
    }

    return () => {
      try {
        if (pusherClient) {
          pusherClient.unbind('realtime-mode');
          pusherClient.unsubscribe(chatRoom);
        }
      } catch (error) {
        console.error('Error cleaning up Pusher subscription:', error);
      }
    }
  }, [chatRoom])

  return {
    liveChat,
  }
}

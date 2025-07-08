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
  const onOpenChatBot = () => setBotOpened((prev) => !prev)
  const [loading, setLoading] = useState<boolean>(true)
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
        width: botOpened ? 550 : 80,
        height: botOpened ? 800 : 80,
      })
    )
  }, [botOpened])

  let limitRequest = 0

  const onGetDomainChatBot = async (id: string) => {
    setCurrentBotId(id)
    const chatbot = await onGetCurrentChatBot(id)
    if (chatbot) {
      setOnChats((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: chatbot.chatBot?.welcomeMessage!,
        },
      ])
      setCurrentBot(chatbot)
      setLoading(false)
    }
  }

  useEffect(() => {
    window.addEventListener('message', (e) => {
      console.log(e.data)
      const botid = e.data
      if (limitRequest < 1 && typeof botid == 'string') {
        onGetDomainChatBot(botid)
        limitRequest++
      }
    })
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
            id: currentBotId,
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
            id: currentBotId,
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
  const processedMessagesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!chatRoom) return;
    
    console.log('Subscribing to Pusher channel:', chatRoom);
    pusherClient.subscribe(chatRoom);
    
    pusherClient.bind('realtime-mode', (data: any) => {
      console.log('Received realtime message:', data);
      
      if (!data?.chat?.message) {
        console.warn('Received invalid message format:', data);
        return;
      }
      
      // Create a unique identifier for this message
      const messageId = `${data.chat.role}-${data.chat.message}-${Date.now()}`;
      
      // Check if we've already processed this message
      if (!processedMessagesRef.current.has(messageId)) {
        processedMessagesRef.current.add(messageId);
        
        // Add message to chat
        setChats((prev: any) => {
          // Check if the message already exists in the chat (prevent duplicates)
          const messageExists = prev.some((msg: { content: string; role: string }) => 
            msg.content === data.chat.message && 
            msg.role === data.chat.role
          );
          
          if (messageExists) {
            console.log('Duplicate message detected, skipping:', data.chat.message);
            return prev;
          }
          
          return [
            ...prev,
            {
              role: data.chat.role,
              content: data.chat.message,
            },
          ];
        });
      }
    });
    
    return () => {
      console.log('Unsubscribing from Pusher channel:', chatRoom);
      pusherClient.unbind('realtime-mode');
      pusherClient.unsubscribe(chatRoom);
    };
  }, [chatRoom, setChats]);
}

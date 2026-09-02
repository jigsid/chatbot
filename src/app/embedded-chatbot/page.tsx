'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Lock } from 'lucide-react'
import { pusherClient } from '@/lib/utils'
import VoiceAssistant from '@/components/chatbotIframe/voice-assistant'
import { AnimatePresence, motion } from 'framer-motion'

export default function EmbeddedChatbot() {
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: 'Hello! How can I help you today?',
    },
  ])
  const [chatRoomId, setChatRoomId] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'INIT_CHAT' && event.data.email) {
        setEmail(event.data.email)
        setEmailSubmitted(true)
        initializeChat(event.data.email)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    if (!chatRoomId || !pusherClient) return

    try {
      const channel = pusherClient.subscribe(chatRoomId)
      channel.bind('message', (data: any) => {
        if (data.message.role === 'assistant') {
          setSending(false)
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: data.message.message,
            },
          ])
        }
      })

      return () => {
        pusherClient.unsubscribe(chatRoomId)
      }
    } catch (error) {
      console.error('Error setting up Pusher subscription:', error)
    }
  }, [chatRoomId])

  const initializeChat = async (userEmail: string) => {
    try {
      window.parent.postMessage(
        {
          type: 'CHAT_INITIALIZED',
          email: userEmail,
        },
        '*'
      )

      const response = await fetch('/api/external-chatbot-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          message: 'Chat session started',
          role: 'system',
        }),
      })

      const data = await response.json()
      setChatRoomId(data.chatRoomId)
    } catch (error) {
      console.error('Failed to initialize chat:', error)
    }
  }

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setEmailSubmitted(true)
      initializeChat(email)
    }
  }

  const sendUserMessage = async (content: string) => {
    if (!content.trim() || !chatRoomId) return

    setMessages((prev) => [...prev, { role: 'user', content }])
    setMessage('')
    setSending(true)

    try {
      const response = await fetch('/api/external-chatbot-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          message: content,
          role: 'user',
          chatRoomId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      if (data.reply?.message) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply.message },
        ])
        setSending(false)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSending(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendUserMessage(message)
  }

  const handleVoiceMessage = (voiceMessage: string) => {
    if (voiceMessage.trim() && chatRoomId) {
      sendUserMessage(voiceMessage)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#F4F5F7] text-slate-900">
      <AnimatePresence mode="wait">
      {!emailSubmitted ? (
        <motion.div
          key="gate"
          className="flex-1 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="px-5 pt-5 pb-6 text-white bg-[#0B1F3A]">
            <p className="text-[13px] text-white/70">Customer Support</p>
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] mt-2 leading-tight">
              How can we help?
            </h2>
            <p className="text-[13px] text-white/70 mt-2">
              Start a conversation. We typically reply in a few minutes.
            </p>
          </div>
          <div className="flex-1 p-5">
            <form onSubmit={handleSubmitEmail} className="space-y-3">
              <label className="block text-[12px] font-medium text-slate-600">
                Work email
              </label>
              <input
                type="email"
                placeholder="nina.v@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 rounded-lg border border-slate-200 bg-white px-3 text-[14px] outline-none focus:border-slate-400"
              />
              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-[#0B1F3A] text-white text-[14px] font-medium hover:bg-[#132a4a]"
              >
                Continue
              </button>
              <p className="flex items-center justify-center gap-1 text-[11px] text-slate-400 pt-2">
                <Lock className="h-3 w-3" />
                Your conversation is private
              </p>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          className="flex-1 flex flex-col min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="px-5 py-4 text-white bg-[#0B1F3A] flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-full bg-white/15 flex items-center justify-center text-[15px] font-medium">
              S
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_0_2px_#0B1F3A]" />
            </div>
            <div>
              <p className="text-[15px] font-medium leading-none">Support</p>
              <p className="text-[12px] text-white/70 mt-1.5">
                Online · Typically replies in a few minutes
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 text-[14px] leading-[1.45] ${
                    msg.role === 'assistant'
                      ? 'bg-white text-slate-800 rounded-[16px] rounded-bl-md border border-slate-200/80'
                      : 'bg-[#0B1F3A] text-white rounded-[16px] rounded-br-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200/80 rounded-[16px] rounded-bl-md px-3.5 py-3">
                  <div className="flex items-center gap-[5px]">
                    <span className="widget-dot !bg-slate-400 !w-[5px] !h-[5px]" />
                    <span className="widget-dot !bg-slate-400 !w-[5px] !h-[5px]" style={{ animationDelay: '160ms' }} />
                    <span className="widget-dot !bg-slate-400 !w-[5px] !h-[5px]" style={{ animationDelay: '320ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="bg-white border-t border-slate-200/80 px-3 pt-2.5 pb-2"
          >
            <div className="flex items-end gap-1">
              <input
                placeholder="Write a reply…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-[14px] leading-6 py-2.5 px-2 outline-none placeholder:text-slate-400"
              />
              <VoiceAssistant onMessage={handleVoiceMessage} />
              <button
                type="submit"
                disabled={!message.trim() || !chatRoomId}
                className="h-10 w-10 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="flex items-center justify-center gap-1 pt-1 text-[10px] text-slate-400">
              <Lock className="h-2.5 w-2.5" />
              Your conversation is private
            </p>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}

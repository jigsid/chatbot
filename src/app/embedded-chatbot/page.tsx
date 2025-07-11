'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, Send } from 'lucide-react'
import { onStoreConversations } from '@/actions/bot'
import { pusherClient } from '@/lib/utils'
import VoiceAssistant from '@/components/chatbotIframe/voice-assistant'

// Replace this with your actual Vapi API key
const VAPI_API_KEY = "089ed132-b99b-4d1f-a61f-a99270f0a723"

export default function EmbeddedChatbot() {
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: 'Hello! How can I help you today?'
    }
  ])
  const [chatRoomId, setChatRoomId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Listen for messages from parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Make sure message is from parent
      if (event.origin !== window.location.origin) return
      
      if (event.data.type === 'INIT_CHAT') {
        if (event.data.email) {
          setEmail(event.data.email)
          setEmailSubmitted(true)
          initializeChat(event.data.email)
        }
      }
    }
    
    window.addEventListener('message', handleMessage)
    
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])
  
  // Set up Pusher subscription when chatRoomId is available
  useEffect(() => {
    if (!chatRoomId || !pusherClient) return
    
    try {
      const channel = pusherClient.subscribe(chatRoomId)
      
      channel.bind('message', (data: any) => {
        if (data.message.role === 'assistant') {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: data.message.message
          }])
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
      // Notify parent that chat is initialized
      window.parent.postMessage({
        type: 'CHAT_INITIALIZED',
        email: userEmail
      }, '*')
      
      // Create a new chat room or get existing one
      const response = await fetch('/api/external-chatbot-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          message: 'Chat session started',
          role: 'system'
        })
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
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim() || !chatRoomId) return
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: message
    }
    
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    
    try {
      // Send message to the backend
      const response = await fetch('/api/external-chatbot-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          message: userMessage.content,
          role: 'user',
          chatRoomId
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      // The assistant's response will come through Pusher
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
  
  // Handle voice message from the voice assistant
  const handleVoiceMessage = (voiceMessage: string) => {
    if (voiceMessage.trim() && chatRoomId) {
      // Set the message in the input field
      setMessage(voiceMessage)
      
      // Send the message
      const userMessage = {
        role: 'user',
        content: voiceMessage
      }
      
      setMessages(prev => [...prev, userMessage])
      setMessage('')
      
      // Send message to the backend
      fetch('/api/external-chatbot-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          message: userMessage.content,
          role: 'user',
          chatRoomId
        })
      }).catch(error => {
        console.error('Error sending voice message:', error)
      })
    }
  }
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {!emailSubmitted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Enter your email to start chatting</h2>
            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Start Chat
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="bg-primary text-white p-3 text-center font-medium">
            SmartRep AI Chat
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      AI
                    </div>
                  ) : (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      msg.role === 'assistant'
                        ? 'bg-white border border-gray-200'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
              
              {/* Voice Assistant */}
              <VoiceAssistant onMessage={handleVoiceMessage} />
            </div>
          </form>
        </div>
      )}
    </div>
  )
} 
import { useState, useEffect, useRef } from 'react'
import Vapi from '@vapi-ai/web'

interface VapiMessage {
  type: string
  role?: string
  transcript?: string
  transcriptType?: string
}

interface Metadata {
  [key: string]: string
}

export const useVoiceAssistant = (apiKey: string) => {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [assistantStatus, setAssistantStatus] = useState<'idle' | 'listening' | 'speaking'>('idle')
  const [transcript, setTranscript] = useState<string>('')
  const vapiRef = useRef<Vapi | null>(null)

  useEffect(() => {
    if (!apiKey) return

    // Initialize Vapi instance
    const vapiInstance = new Vapi(apiKey)
    vapiRef.current = vapiInstance

    // Set up event listeners
    vapiInstance.on('call-start', () => {
      setIsCallActive(true)
      setAssistantStatus('listening')
    })

    vapiInstance.on('call-end', () => {
      setIsCallActive(false)
      setAssistantStatus('idle')
    })

    vapiInstance.on('speech-start', () => {
      setAssistantStatus('speaking')
    })

    vapiInstance.on('speech-end', () => {
      setAssistantStatus('listening')
    })

    vapiInstance.on('message', (message: VapiMessage) => {
      if (message.type === 'transcript' && message.transcriptType === 'final' && message.transcript) {
        setTranscript(message.transcript)
      }
    })

    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error)
    })

    return () => {
      // Clean up Vapi instance on unmount
      if (vapiInstance) {
        vapiInstance.stop()
      }
    }
  }, [apiKey])

  const startCall = (assistantId: string, metadata?: Metadata) => {
    if (vapiRef.current) {
      if (metadata) {
        // Start call with metadata
        vapiRef.current.start(assistantId, { metadata })
      } else {
        // Start call without metadata
        vapiRef.current.start(assistantId)
      }
    }
  }

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop()
    }
  }

  const toggleMute = () => {
    if (vapiRef.current) {
      vapiRef.current.setMuted(!isMuted)
      setIsMuted(!isMuted)
    }
  }

  const say = (message: string, endCallAfterSpoken: boolean = false) => {
    if (vapiRef.current) {
      vapiRef.current.say(message, endCallAfterSpoken)
    }
  }

  const sendMessage = (content: string, role: 'system' | 'user' | 'assistant' = 'user') => {
    if (vapiRef.current) {
      vapiRef.current.send({
        type: 'add-message',
        message: {
          role,
          content
        }
      })
    }
  }

  return {
    isCallActive,
    isMuted,
    assistantStatus,
    transcript,
    startCall,
    endCall,
    toggleMute,
    say,
    sendMessage
  }
} 
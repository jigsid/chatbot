'use client'
import React, { useEffect, useRef, useState } from 'react'
import Vapi from '@vapi-ai/web'
import { Button } from '../ui/button'
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react'
import { VAPI_CONFIG } from '@/config/vapi'

interface VoiceAssistantProps {
  onMessage: (message: string) => void
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onMessage }) => {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [assistantStatus, setAssistantStatus] = useState<'idle' | 'listening' | 'speaking'>('idle')
  const vapiRef = useRef<Vapi | null>(null)

  useEffect(() => {
    // Initialize Vapi instance
    const vapiInstance = new Vapi(VAPI_CONFIG.API_KEY)
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

    vapiInstance.on('message', (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final' && message.transcript) {
        onMessage(message.transcript)
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
  }, [onMessage])

  const startCall = () => {
    if (vapiRef.current) {
      vapiRef.current.start(VAPI_CONFIG.ASSISTANT_ID)
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

  return (
    <div className="flex items-center gap-2">
      {isCallActive ? (
        <>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={endCall}
            title="End call"
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
          <Button
            variant={isMuted ? "secondary" : "outline"}
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <div className="text-xs text-gray-500">
            {assistantStatus === 'speaking' ? 'Assistant is speaking...' : 'Assistant is listening...'}
          </div>
        </>
      ) : (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={startCall}
          title="Start voice call"
        >
          <Phone className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default VoiceAssistant 
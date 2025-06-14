'use client'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react'
import { useVoiceAssistant } from '@/hooks/use-voice-assistant'
import { useVapi } from '@/context/vapi-provider'

interface VoiceAssistantProps {
  onMessage: (message: string) => void
  chatRoomId?: string
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onMessage, chatRoomId }) => {
  const { config } = useVapi()
  const {
    isCallActive,
    isMuted,
    assistantStatus,
    transcript,
    startCall,
    endCall,
    toggleMute
  } = useVoiceAssistant(config.apiKey)

  // Send transcript to parent component when it changes
  useEffect(() => {
    if (transcript) {
      onMessage(transcript)
    }
  }, [transcript, onMessage])

  const handleStartCall = () => {
    // If we have a chatRoomId, add it to the metadata
    const metadata = chatRoomId ? { chatRoomId } : undefined
    
    startCall(config.assistantId, metadata)
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
          onClick={handleStartCall}
          title="Start voice call"
        >
          <Phone className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default VoiceAssistant 
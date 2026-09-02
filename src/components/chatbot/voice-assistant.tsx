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
    <div className="flex items-center gap-1 shrink-0">
      {isCallActive ? (
        <>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={endCall}
            title="End call"
            type="button"
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
          <Button
            variant={isMuted ? "secondary" : "outline"}
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            type="button"
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg h-10 w-10 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
          onClick={handleStartCall}
          title="Start voice call"
          type="button"
        >
          <Phone className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default VoiceAssistant 
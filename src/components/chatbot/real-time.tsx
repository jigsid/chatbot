import React from 'react'
import { useRealTime } from '@/hooks/chatbot/use-chatbot'

type Props = {
  chatRoomId: string
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant'
        content: string
        link?: string | undefined
      }[]
    >
  >
}

const RealTimeMode = ({ chatRoomId, setChats }: Props) => {
  useRealTime(chatRoomId, setChats)

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/90">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
      Live agent
    </span>
  )
}

export default RealTimeMode

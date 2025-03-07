'use client'
import { useChatBot } from '@/hooks/chatbot/use-chatbot'
import React from 'react'
import { BotWindow } from './window'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { BotIcon } from '@/icons/bot-icon'

type Props = {}

const AiChatBot = (props: Props) => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
  } = useChatBot()

  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4 p-4 pointer-events-none">
      {botOpened && (
        <div className="pointer-events-auto">
          <BotWindow
            errors={errors}
            setChat={setOnChats}
            realtimeMode={onRealTime}
            helpdesk={currentBot?.helpdesk!}
            domainName={currentBot?.name!}
            ref={messageWindowRef}
            help={currentBot?.chatBot?.helpdesk}
            theme={currentBot?.chatBot?.background}
            textColor={currentBot?.chatBot?.textColor}
            chats={onChats}
            register={register}
            onChat={onStartChatting}
            onResponding={onAiTyping}
          />
        </div>
      )}
      <div
        className={cn(
          'rounded-full relative cursor-pointer shadow-lg w-14 h-14 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 pointer-events-auto',
          loading ? 'invisible' : 'visible animate-in slide-in-from-bottom-2 duration-300'
        )}
        onClick={onOpenChatBot}
      >
        {currentBot?.chatBot?.icon ? (
          <Image
            src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
            alt="bot"
            fill
            className="p-2 rounded-full object-cover"
          />
        ) : (
          <BotIcon className="w-8 h-8 text-white" />
        )}
      </div>
    </div>
  )
}

export default AiChatBot

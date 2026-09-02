'use client'
import { useChatBot } from '@/hooks/chatbot/use-chatbot'
import React from 'react'
import { BotWindow } from './window'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MessageCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const spring = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.8 }

const AiChatBot = () => {
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

  const accent = currentBot?.chatBot?.background || '#0B1F3A'

  return (
    <div className="h-full w-full flex flex-col justify-end items-end gap-3 p-2 pointer-events-none">
      <AnimatePresence>
        {botOpened && (
          <motion.div
            key="chat-window"
            className="pointer-events-auto w-full flex-1 min-h-0 origin-bottom-right"
            initial={{ opacity: 0, y: 28, scale: 0.92, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 18, scale: 0.94, filter: 'blur(4px)' }}
            transition={spring}
          >
            <BotWindow
              errors={errors}
              setChat={setOnChats}
              realtimeMode={onRealTime}
              helpdesk={currentBot?.helpdesk || []}
              domainName={currentBot?.name || 'Support'}
              ref={messageWindowRef}
              help={currentBot?.chatBot?.helpdesk}
              theme={currentBot?.chatBot?.background}
              textColor={currentBot?.chatBot?.textColor}
              chats={onChats}
              register={register}
              onChat={onStartChatting}
              onResponding={onAiTyping}
              onClose={onOpenChatBot}
              botIcon={currentBot?.chatBot?.icon}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={botOpened ? 'Close chat' : 'Open chat'}
        aria-expanded={botOpened}
        onClick={onOpenChatBot}
        className={cn(
          'pointer-events-auto relative h-14 w-14 rounded-full text-white overflow-hidden',
          'flex items-center justify-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          loading && 'opacity-80'
        )}
        style={{
          background: `linear-gradient(145deg, ${accent} 0%, ${accent}bb 100%)`,
          boxShadow: `0 12px 28px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: botOpened ? 0 : [0, -3, 0],
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          scale: spring,
          opacity: { duration: 0.25 },
          y: botOpened
            ? { duration: 0.2 }
            : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {!botOpened && (
          <span
            className="absolute inset-[-4px] rounded-full widget-launcher-glow"
            style={{ borderColor: accent }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {botOpened ? (
            <motion.span
              key="close"
              className="flex"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : currentBot?.chatBot?.icon ? (
            <motion.span
              key="icon"
              className="absolute inset-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <Image
                src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
                alt="Open chat"
                fill
                className="rounded-full object-cover p-1"
              />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="flex"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default AiChatBot

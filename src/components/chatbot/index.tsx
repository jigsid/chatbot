'use client'
import { useChatBot } from '@/hooks/chatbot/use-chatbot'
import React from 'react'
import { BotWindow } from './window'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MessageCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { getWidgetPalette } from '@/lib/chatbot-theme'
import { WidgetErrorBoundary } from './widget-error-boundary'

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

  const palette = getWidgetPalette(
    currentBot?.chatBot?.background,
    currentBot?.chatBot?.textColor
  )
  const accent = palette.brand
  const onAccent = palette.onBrand

  return (
    <div className="relative h-full w-full pointer-events-none">
      <AnimatePresence>
        {botOpened && (
          <motion.div
            key="chat-window"
            className="pointer-events-auto absolute left-2 right-2 top-2 bottom-[4.75rem] origin-bottom-right"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={spring}
          >
            <WidgetErrorBoundary>
              <BotWindow
                errors={errors}
                setChat={setOnChats}
                realtimeMode={onRealTime}
                helpdesk={currentBot?.helpdesk || []}
                domainName={currentBot?.name || 'Support'}
                ref={messageWindowRef}
                help={currentBot?.chatBot?.helpdesk}
                theme={palette.brand}
                textColor={currentBot?.chatBot?.textColor}
                chats={onChats}
                register={register}
                onChat={onStartChatting}
                onResponding={onAiTyping}
                onClose={onOpenChatBot}
                botIcon={currentBot?.chatBot?.icon}
              />
            </WidgetErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={botOpened ? 'Close chat' : 'Open chat'}
        aria-expanded={botOpened}
        onClick={onOpenChatBot}
        className={cn(
          'pointer-events-auto absolute bottom-2 right-2 z-20 h-14 w-14 shrink-0 rounded-full overflow-hidden',
          'flex items-center justify-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          loading && 'opacity-80'
        )}
        style={{
          backgroundColor: accent,
          color: onAccent,
          boxShadow: '0 12px 28px rgba(11, 31, 58, 0.28)',
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={spring}
      >
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
              <X className="h-6 w-6" color={onAccent} strokeWidth={2} />
            </motion.span>
          ) : currentBot?.chatBot?.icon ? (
            <motion.span
              key="icon"
              className="absolute inset-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <span className="absolute inset-[6px] rounded-full bg-white overflow-hidden">
                <Image
                  src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
                  alt="Open chat"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </span>
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
              <MessageCircle className="h-6 w-6" color={onAccent} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default AiChatBot

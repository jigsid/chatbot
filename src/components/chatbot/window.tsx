'use client'
import { ChatBotMessageProps } from '@/schemas/conversation.schema'
import React, { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import RealTimeMode from './real-time'
import Bubble from './bubble'
import { Responding } from './responding'
import { Paperclip, Send, X, ChevronLeft, Lock } from 'lucide-react'
import Accordion from '../accordian'
import VoiceAssistant from './voice-assistant'
import Image from 'next/image'
import { getWidgetPalette } from '@/lib/chatbot-theme'

type Props = {
  errors: any
  register: UseFormRegister<ChatBotMessageProps>
  chats: { role: 'assistant' | 'user'; content: string; link?: string }[]
  onChat(): void
  onResponding: boolean
  domainName: string
  theme?: string | null
  textColor?: string | null
  help?: boolean
  realtimeMode:
    | {
        chatroom: string
        mode: boolean
      }
    | undefined
  helpdesk: {
    id: string
    question: string
    answer: string
    domainId: string | null
  }[]
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant'
        content: string
        link?: string | undefined
      }[]
    >
  >
  onClose?: () => void
  botIcon?: string | null
}

const brandName = (domainName?: string) => {
  if (!domainName) return 'Support'
  return domainName.replace(/\.(com|io|ai|net|org|co)$/i, '')
}

const greeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
      theme,
      textColor,
      help,
      onClose,
      botIcon,
    },
    ref
  ) => {
    const formRef = React.useRef<HTMLFormElement>(null)
    const [view, setView] = React.useState<'chat' | 'help'>('chat')
    const palette = getWidgetPalette(theme, textColor)
    const accent = palette.brand
    const onAccent = palette.onBrand
    const showHelp = Boolean(help && helpdesk?.length)
    const name = brandName(domainName)
    const showIntro = chats.length <= 1 && !onResponding

    const handleVoiceMessage = (message: string) => {
      const inputElement = document.querySelector(
        'input[name="content"]'
      ) as HTMLInputElement
      if (inputElement && message.trim()) {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set
        setter?.call(inputElement, message)
        inputElement.dispatchEvent(new Event('input', { bubbles: true }))
        if (formRef.current) {
          formRef.current.requestSubmit()
        }
      }
    }

    const fillQuestion = (question: string) => {
      setView('chat')
      const inputElement = document.querySelector(
        'input[name="content"]'
      ) as HTMLInputElement
      if (!inputElement) return
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set
      setter?.call(inputElement, question)
      inputElement.dispatchEvent(new Event('input', { bubbles: true }))
      inputElement.focus()
    }

    return (
      <div className="chatbot-window h-full w-full flex flex-col bg-[#F4F5F7] overflow-hidden rounded-[20px] border border-black/[0.06] shadow-[0_20px_50px_rgba(11,31,58,0.18)]">
        <header
          className="shrink-0 px-5 pt-4 pb-4"
          style={{ backgroundColor: accent, color: onAccent }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-11 w-11 shrink-0">
                {botIcon ? (
                  <Image
                    src={`https://ucarecdn.com/${botIcon}/`}
                    alt=""
                    fill
                    unoptimized
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-white/15 flex items-center justify-center text-[15px] font-medium tracking-wide">
                    {name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span
                  className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22C55E]"
                  style={{ boxShadow: `0 0 0 2px ${accent}` }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-medium leading-none tracking-[-0.01em]">
                  {name} Support
                </p>
                <p className="mt-1.5 text-[12px] text-white/70 leading-none">
                  {realtimeMode?.mode ? (
                    <RealTimeMode
                      setChats={setChat}
                      chatRoomId={realtimeMode.chatroom}
                    />
                  ) : (
                    'Online · Typically replies in a few minutes'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {showHelp && (
                <button
                  type="button"
                  onClick={() => setView(view === 'help' ? 'chat' : 'help')}
                  className="h-8 px-2.5 rounded-md text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {view === 'help' ? 'Chat' : 'Help'}
                </button>
              )}
              {onClose && (
                <button
                  type="button"
                  aria-label="Close chat"
                  onClick={onClose}
                  className="h-8 w-8 rounded-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </header>

        {view === 'help' ? (
          <div className="flex-1 min-h-0 overflow-y-auto bg-white px-5 py-5">
            <button
              type="button"
              onClick={() => setView('chat')}
              className="inline-flex items-center gap-1 text-[12px] text-slate-500 hover:text-slate-800 mb-4"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Back to conversation
            </button>
            <p className="text-[13px] font-medium text-slate-900">Help Center</p>
            <p className="text-[12px] text-slate-500 mt-1 mb-4">
              Answers to the questions we hear most often.
            </p>
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {helpdesk.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                  className="text-slate-800 text-[13px]"
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex-1 min-h-0 px-4 py-4 flex flex-col gap-3 overflow-y-auto chat-window"
              ref={ref}
            >
              {showIntro && (
                <div className="pb-2">
                  <p className="text-[22px] font-semibold tracking-[-0.03em] text-slate-900 leading-tight">
                    {greeting()}
                  </p>
                  <p className="text-[14px] text-slate-500 mt-1.5 leading-snug">
                    You are chatting with {name} Support. How can we help you today?
                  </p>
                </div>
              )}

              {chats.map((chat, key) => (
                <Bubble
                  key={key}
                  message={chat}
                  accent={accent}
                  animate={
                    chat.role === 'assistant' && key === chats.length - 1
                  }
                  showAvatar={
                    chat.role === 'assistant' &&
                    (key === 0 || chats[key - 1]?.role !== 'assistant')
                  }
                />
              ))}
              {onResponding && <Responding />}

              {showIntro && helpdesk?.length > 0 && (
                <div className="pt-1 space-y-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
                    Suggested
                  </p>
                  {helpdesk.slice(0, 3).map((desk) => (
                    <button
                      key={desk.id}
                      type="button"
                      onClick={() => fillQuestion(desk.question)}
                      className="w-full text-left bg-white border border-slate-200/80 rounded-xl px-3.5 py-3 text-[13px] text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      {desk.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              ref={formRef}
              onSubmit={onChat}
              className="shrink-0 bg-white border-t border-slate-200/80 px-3 pt-2.5 pb-2"
            >
              <div className="flex items-end gap-1">
                <label
                  htmlFor="chatbot-file"
                  className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <Paperclip className="h-4 w-4" />
                </label>
                <input
                  type="file"
                  id="chatbot-file"
                  className="hidden"
                  {...register('image')}
                />
                <input
                  {...register('content')}
                  placeholder="Write a reply…"
                  autoComplete="off"
                  className="flex-1 min-w-0 bg-transparent text-[14px] leading-6 py-2.5 outline-none placeholder:text-slate-400 text-slate-800"
                />
                <VoiceAssistant
                  onMessage={handleVoiceMessage}
                  chatRoomId={realtimeMode?.chatroom}
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accent }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {errors.content && (
                <p className="text-[12px] text-red-600 px-2 pb-1">
                  {errors.content.message}
                </p>
              )}
              <p className="flex items-center justify-center gap-1 pt-1 pb-0.5 text-[10px] text-slate-400">
                <Lock className="h-2.5 w-2.5" />
                Your conversation is private
              </p>
            </form>
          </>
        )}
      </div>
    )
  }
)

BotWindow.displayName = 'BotWindow'

'use client'
import React, { useState, useEffect } from 'react'
import { cn, extractUUIDFromString } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import TypingEffect from './typing-effect'

type Props = {
  message: {
    role: 'assistant' | 'user'
    content: string
    link?: string
  }
  createdAt?: Date | string
  accent?: string
  animate?: boolean
  showAvatar?: boolean
}

const Bubble = ({
  message,
  createdAt,
  accent = '#0B1F3A',
  animate,
  showAvatar = true,
}: Props) => {
  const image = extractUUIDFromString(message.content)
  const [showTypingEffect, setShowTypingEffect] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const isAssistant = message.role === 'assistant'

  useEffect(() => {
    if (isAssistant && animate) {
      setShowTypingEffect(true)
      const timeout = setTimeout(() => setTypingComplete(true), 3500)
      return () => clearTimeout(timeout)
    }
    setTypingComplete(true)
  }, [isAssistant, animate])

  return (
    <div
      className={cn(
        'flex gap-2 items-end max-w-[88%]',
        isAssistant ? 'self-start' : 'self-end'
      )}
    >
      {isAssistant && (
        <div
          className={cn(
            'h-6 w-6 rounded-full shrink-0 mb-0.5',
            showAvatar ? 'bg-slate-300' : 'bg-transparent'
          )}
          aria-hidden
        />
      )}
      <div className="min-w-0">
        {createdAt && (
          <p
            className={cn(
              'text-[10px] mb-1 text-slate-400',
              isAssistant ? 'text-left' : 'text-right'
            )}
          >
            {new Date(createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
        <div
          className={cn(
            'px-3.5 py-2.5 text-[14px] leading-[1.45]',
            isAssistant
              ? 'bg-white text-slate-800 rounded-[16px] rounded-bl-md border border-slate-200/80'
              : 'text-white rounded-[16px] rounded-br-md'
          )}
          style={!isAssistant ? { backgroundColor: accent } : undefined}
        >
          {image ? (
            <div className="relative aspect-square w-40 rounded-md overflow-hidden">
              <Image
                src={`https://ucarecdn.com/${image[0]}/`}
                fill
                alt="Uploaded image"
                className="object-cover"
              />
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">
              {isAssistant && showTypingEffect && !typingComplete ? (
                <TypingEffect
                  text={message.content.replace('(complete)', ' ')}
                  speed={14}
                  onComplete={() => setTypingComplete(true)}
                  textColor="#1e293b"
                />
              ) : (
                <>
                  {message.content.replace('(complete)', ' ')}
                  {message.link && (
                    <Link
                      className={cn(
                        'underline font-medium pl-1',
                        isAssistant ? 'text-slate-900' : 'text-white'
                      )}
                      href={message.link}
                      target="_blank"
                    >
                      Continue
                    </Link>
                  )}
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bubble

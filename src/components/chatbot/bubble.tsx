import React from 'react'
import { cn, extractUUIDFromString, getMonthName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  message: {
    role: 'assistant' | 'user'
    content: string
    link?: string
  }
  createdAt?: Date
}

const Bubble = ({ message, createdAt }: Props) => {
  let d = new Date()
  const image = extractUUIDFromString(message.content)
  console.log(message.link)

  return (
    <div
      className={cn(
        'flex gap-1.5 items-end animate-in slide-in-from-bottom-2 duration-200',
        message.role == 'assistant' ? 'self-start pl-0.5' : 'self-end flex-row-reverse pr-0.5'
      )}
    >
      {message.role == 'assistant' ? (
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md shadow-sm"></div>
          <div className="absolute inset-[0.5px] bg-white rounded-[3px] flex items-center justify-center">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-500"
            >
              <rect x="5" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 16V19" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 19H16" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 10L5 8M3 14L5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M21 10L19 8M21 14L19 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      ) : (
        <Avatar className="w-4 h-4 ring-[0.5px] ring-offset-[0.5px] ring-gray-200">
          <AvatarFallback>
            <User className="w-2.5 h-2.5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'flex flex-col gap-1 min-w-[140px] max-w-[240px] p-2 rounded-lg shadow-sm',
          message.role == 'assistant'
            ? 'bg-white border border-gray-100'
            : 'bg-blue-500 text-white'
        )}
      >
        {createdAt ? (
          <div className={cn(
            'flex gap-1.5 text-[9px]',
            message.role == 'assistant' ? 'text-gray-400' : 'text-blue-100'
          )}>
            <p>
              {createdAt.getDate()} {getMonthName(createdAt.getMonth())}
            </p>
            <p>
              {createdAt.getHours()}:{createdAt.getMinutes()}
              {createdAt.getHours() > 12 ? 'PM' : 'AM'}
            </p>
          </div>
        ) : (
          <p className={cn(
            'text-[9px]',
            message.role == 'assistant' ? 'text-gray-400' : 'text-blue-100'
          )}>
            {`${d.getHours()}:${d.getMinutes()} ${
              d.getHours() > 12 ? 'pm' : 'am'
            }`}
          </p>
        )}
        {image ? (
          <div className="relative aspect-square rounded-md overflow-hidden">
            <Image
              src={`https://ucarecdn.com/${image[0]}/`}
              fill
              alt="image"
              className="object-cover"
            />
          </div>
        ) : (
          <p className={cn(
            'text-[11px] leading-[1.4]',
            message.role == 'assistant' ? 'text-gray-700' : 'text-white'
          )}>
            {message.content.replace('(complete)', ' ')}
            {message.link && (
              <Link
                className={cn(
                  'underline font-medium pl-1 hover:opacity-80 transition-opacity',
                  message.role == 'assistant' ? 'text-blue-500' : 'text-white'
                )}
                href={message.link}
                target="_blank"
              >
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Bubble

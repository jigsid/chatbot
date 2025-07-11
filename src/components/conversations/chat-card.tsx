'use client'
import { useChatTime } from '@/hooks/conversation/use-conversation'
import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { User } from 'lucide-react'
import { UrgentIcon } from '@/icons/urgent-icon'

type Props = {
  title: string
  description?: string
  createdAt?: Date
  id: string
  onChat(): void
  seen?: boolean
}

const ChatCard = ({
  title,
  description,
  createdAt,
  onChat,
  id,
  seen,
}: Props) => {
  const { messageSentAt, urgent } = useChatTime(createdAt || new Date(), id)

  // Format email for display
  const formatEmail = (email: string) => {
    if (!email) return 'Unknown';
    if (email.length > 20) {
      const atIndex = email.indexOf('@');
      if (atIndex > 0) {
        const username = email.substring(0, atIndex);
        const domain = email.substring(atIndex);
        if (username.length > 10) {
          return username.substring(0, 10) + '...' + domain;
        }
      }
    }
    return email;
  };

  return (
    <Card
      onClick={onChat}
      className={`rounded-none border-r-0 hover:bg-muted cursor-pointer transition duration-150 ease-in-out ${!seen ? 'border-l-4 border-l-primary' : ''}`}
    >
      <CardContent className="py-4 flex gap-3">
        <div>
          <Avatar>
            <AvatarFallback className="bg-muted">
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between w-full overflow-hidden">
          <div className="overflow-hidden">
            <div className="flex gap-2 items-center">
              <CardDescription className={`font-bold leading-none truncate max-w-[150px] ${!seen ? 'text-foreground' : 'text-gray-600'}`} title={title}>
                {formatEmail(title)}
              </CardDescription>
              {urgent && !seen && <UrgentIcon />}
            </div>
            <CardDescription className={`truncate max-w-[170px] ${!seen ? 'text-muted-foreground' : 'text-gray-400'}`}>
              {description
                ? description.substring(0, 20) + (description.length > 20 ? '...' : '')
                : 'This chatroom is empty'}
            </CardDescription>
          </div>
          <div className="flex-shrink-0 flex justify-end">
            <CardDescription className="text-xs whitespace-nowrap">
              {messageSentAt || ''}
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatCard

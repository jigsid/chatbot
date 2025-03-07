import React, { useState, useEffect } from 'react'
import { cn, extractUUIDFromString, getMonthName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Smile, Frown, Meh } from 'lucide-react'
import TypingEffect from './typing-effect'

type Props = {
  message: {
    role: 'assistant' | 'user'
    content: string
    link?: string
    sentiment?: 'positive' | 'negative' | 'neutral'
  }
  createdAt?: Date
}

// Simple sentiment analysis function
const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveWords = ['happy', 'great', 'excellent', 'good', 'love', 'thanks', 'thank', 'awesome', 'amazing', 'wonderful', 'pleased', 'delighted'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'angry', 'upset', 'annoyed', 'frustrated', 'unhappy', 'dislike', 'problem'];
  
  const lowerText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};

const Bubble = ({ message, createdAt }: Props) => {
  let d = new Date()
  const image = extractUUIDFromString(message.content)
  const [showTypingEffect, setShowTypingEffect] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Determine sentiment if not already provided
  const sentiment = message.sentiment || (message.role === 'user' ? analyzeSentiment(message.content) : undefined);
  
  // Get sentiment icon
  const getSentimentIcon = () => {
    if (!sentiment || message.role !== 'user') return null;
    
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-3 h-3 text-green-500" />;
      case 'negative':
        return <Frown className="w-3 h-3 text-red-500" />;
      case 'neutral':
        return <Meh className="w-3 h-3 text-gray-500" />;
      default:
        return null;
    }
  };
  
  // Show typing effect for bot messages when they first appear
  useEffect(() => {
    if (message.role === 'assistant') {
      setShowTypingEffect(true);
      
      // After 5 seconds, force complete if not already done
      const timeout = setTimeout(() => {
        setTypingComplete(true);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [message.role]);
  
  // Handle typing completion
  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

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
        style={{ 
          color: message.role === 'assistant' ? '#1f2937' : '#ffffff',
          backgroundColor: message.role === 'assistant' ? '#ffffff' : '#3b82f6'
        }}
      >
        <div className={cn(
          'flex justify-between items-center',
          message.role == 'assistant' ? 'text-gray-400' : 'text-blue-100'
        )}>
          <p className="text-[9px]" style={{ color: message.role === 'assistant' ? '#9ca3af' : '#bfdbfe' }}>
            {createdAt ? 
              `${createdAt.getDate()} ${getMonthName(createdAt.getMonth())} ${createdAt.getHours()}:${createdAt.getMinutes()} ${createdAt.getHours() > 12 ? 'PM' : 'AM'}` :
              `${d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? 'pm' : 'am'}`
            }
          </p>
          {getSentimentIcon()}
        </div>
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
          )}
          style={{ color: message.role === 'assistant' ? '#374151' : '#ffffff' }}
          >
            {message.role === 'assistant' && showTypingEffect && !typingComplete ? (
              <TypingEffect 
                text={message.content.replace('(complete)', ' ')} 
                speed={20}
                onComplete={handleTypingComplete}
                textColor={message.role === 'assistant' ? '#374151' : '#ffffff'}
              />
            ) : (
              <>
                {message.content.replace('(complete)', ' ')}
                {message.link && (
                  <Link
                    className={cn(
                      'underline font-medium pl-1 hover:opacity-80 transition-opacity',
                      message.role == 'assistant' ? 'text-blue-500' : 'text-white'
                    )}
                    style={{ color: message.role === 'assistant' ? '#3b82f6' : '#ffffff' }}
                    href={message.link}
                    target="_blank"
                  >
                    Your Link
                  </Link>
                )}
              </>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Bubble

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import PusherClient from 'pusher-js'
import PusherServer from 'pusher'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractUUIDFromString = (url: string) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  )
}

// Only initialize Pusher if all required environment variables are available
const pusherAppId = process.env.NEXT_PUBLIC_PUSHER_APP_ID;
const pusherAppKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const pusherAppSecret = process.env.NEXT_PUBLIC_PUSHER_APP_SECRET;
const pusherAppCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'eu';

export const pusherServer = pusherAppId && pusherAppKey && pusherAppSecret && pusherAppCluster
  ? new PusherServer({
      appId: pusherAppId,
      key: pusherAppKey,
      secret: pusherAppSecret,
      cluster: pusherAppCluster,
      useTLS: true,
    })
  : null;

export const pusherClient = typeof window !== 'undefined' && pusherAppKey && pusherAppCluster
  ? new PusherClient(pusherAppKey, {
      cluster: pusherAppCluster,
      enabledTransports: ['ws', 'wss'],
    })
  : null;

export const postToParent = (message: string) => {
  window.parent.postMessage(message, '*')
}

export const extractURLfromString = (url: string) => {
  return url.match(/https?:\/\/[^\s"<>]+/)
}

export const extractEmailsFromString = (text: string) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
}

export const getMonthName = (month: number) => {
  return month == 1
    ? 'Jan'
    : month == 2
    ? 'Feb'
    : month == 3
    ? 'Mar'
    : month == 4
    ? 'Apr'
    : month == 5
    ? 'May'
    : month == 6
    ? 'Jun'
    : month == 7
    ? 'Jul'
    : month == 8
    ? 'Aug'
    : month == 9
    ? 'Sep'
    : month == 10
    ? 'Oct'
    : month == 11
    ? 'Nov'
    : month == 12 && 'Dec'
}

// Format date to Month DD, YYYY
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// Format time to HH:MM AM/PM
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

// Format date and time together
export const formatDateTime = (date: Date) => {
  return `${formatDate(date)} at ${formatTime(date)}`
}

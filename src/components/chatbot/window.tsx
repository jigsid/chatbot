'use client'
import { ChatBotMessageProps } from '@/schemas/conversation.schema'
import React, { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import RealTimeMode from './real-time'
import Image from 'next/image'
import TabsMenu from '../tabs/intex'
import { BOT_TABS_MENU } from '@/constants/menu'
import ChatIcon from '@/icons/chat-icon'
import { TabsContent } from '../ui/tabs'
import { Separator } from '../ui/separator'
import Bubble from './bubble'
import { Responding } from './responding'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Paperclip, Send } from 'lucide-react'
import { Label } from '../ui/label'
import { CardDescription, CardTitle } from '../ui/card'
import Accordion from '../accordian'
import UploadButton from '../upload-button'

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
      textColor,
      theme,
      help,
    },
    ref
  ) => {
    console.log(errors)
    return (
      <div className="h-[450px] w-[350px] flex flex-col bg-white rounded-xl border-[1px] border-gray-200 overflow-hidden shadow-lg animate-in slide-in-from-bottom-3 duration-300">
        <div className="flex justify-between items-center px-6 py-2.5 bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
          <div className="flex gap-3">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md"></div>
              <div className="absolute inset-[1px] bg-white rounded-lg flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
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
            <div className="flex items-start flex-col justify-center">
              <h3 className="text-sm font-semibold leading-none text-gray-800">
                Sales Rep - SmartRep AI
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">{domainName.split('.com')[0]}</p>
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
          <div className="relative w-9 h-9">
            <Image
              src="https://ucarecdn.com/019dd17d-b69b-4dea-a16b-60e0f25de1e9/propuser.png"
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
        <TabsMenu
          triggers={BOT_TABS_MENU}
          className="bg-transparent border-b border-gray-100 px-6 pt-1"
        >
          <TabsContent value="chat" className="px-0">
            <div className="flex flex-col h-full">
              <div
                className="px-6 flex h-[250px] flex-col py-3 gap-2 chat-window overflow-y-auto bg-white"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble
                    key={key}
                    message={chat}
                  />
                ))}
                {onResponding && <Responding />}
              </div>
              <form
                onSubmit={onChat}
                className="flex px-6 py-2.5 flex-col flex-1 bg-gray-50 border-t border-gray-100"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      {...register('content')}
                      placeholder="Type your message..."
                      className="focus-visible:ring-1 focus-visible:ring-blue-200 w-full pl-3.5 pr-2.5 py-1.5 bg-white rounded-lg border border-gray-200 text-xs"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 transition-colors h-7 w-7 p-0 rounded-lg shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <Label htmlFor="bot-image" className="mt-1.5 flex items-center gap-1.5 text-gray-500 text-[10px] cursor-pointer hover:text-gray-700 transition-colors pl-1">
                  <Paperclip className="w-3 h-3" />
                  <span>Attach a file</span>
                  <Input
                    {...register('image')}
                    type="file"
                    id="bot-image"
                    className="hidden"
                  />
                </Label>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="help desk" className="px-0">
            <div className="h-[290px] overflow-y-auto overflow-x-hidden px-6 py-3 flex flex-col gap-2.5">
              <div>
                <CardTitle className="text-sm">Help Desk</CardTitle>
                <CardDescription className="text-[10px] text-gray-500">
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal" className="bg-gray-100" />

              {helpdesk.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
        <div className="flex justify-center py-1.5 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-400 text-[10px]">Powered By SmartRep AI</p>
        </div>
      </div>
    )
  }
)

BotWindow.displayName = 'BotWindow'

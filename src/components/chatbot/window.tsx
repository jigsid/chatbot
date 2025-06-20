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
import { Paperclip, Send, Mic, MicOff } from 'lucide-react'
import { Label } from '../ui/label'
import { CardDescription, CardTitle } from '../ui/card'
import Accordion from '../accordian'
import UploadButton from '../upload-button'
import { Badge } from '../ui/badge'
import Avatar3D from './avatar-3d'
import ContextualActions from './contextual-actions'
import { onAiChatBotAssistant } from '@/actions/bot'
import VoiceAssistant from './voice-assistant'

// Add SpeechRecognition types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

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
    const [isListening, setIsListening] = React.useState(false);
    const [transcript, setTranscript] = React.useState('');
    const [avatarMood, setAvatarMood] = React.useState<'happy' | 'neutral' | 'thinking'>('neutral');
    const formRef = React.useRef<HTMLFormElement>(null);
    
    // Update avatar mood based on conversation context
    React.useEffect(() => {
      if (onResponding) {
        setAvatarMood('thinking');
      } else if (chats.length > 0) {
        const lastMessage = chats[chats.length - 1];
        
        if (lastMessage.role === 'assistant') {
          // Check for positive sentiment in bot response
          if (lastMessage.content.toLowerCase().includes('great') || 
              lastMessage.content.toLowerCase().includes('happy') ||
              lastMessage.content.toLowerCase().includes('thank')) {
            setAvatarMood('happy');
          } else {
            setAvatarMood('neutral');
          }
        }
      }
    }, [chats, onResponding]);
    
    // Handle voice assistant message
    const handleVoiceMessage = (message: string) => {
      // Set the input value to the transcript
      const inputElement = document.querySelector('input[name="content"]') as HTMLInputElement;
      if (inputElement && message.trim()) {
        inputElement.value = message;
        // Submit the form to send the message
        if (formRef.current) {
          const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
          formRef.current.dispatchEvent(submitEvent);
        }
      }
    };
    
    return (
      <>
        {/* Add style tag for blue theme */}
        <style jsx global>{`
          /* Blue theme for chatbot */
          .chatbot-window input,
          .chatbot-window textarea {
            color: #1e40af !important;
            border-color: #dbeafe !important;
          }
          
          .chatbot-window input::placeholder {
            color: #60a5fa !important;
          }
          
          .chatbot-window input:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 1px #3b82f6 !important;
          }
          
          .chatbot-window .ui-accordion-trigger {
            color: #1e40af !important;
          }
          
          .chatbot-window .ui-accordion-content {
            color: #3730a3 !important;
          }

          .blue-button {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
            border: none !important;
            color: white !important;
            transition: all 0.2s ease !important;
          }

          .blue-button:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%) !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
          }

          .blue-button:active {
            transform: translateY(0) !important;
          }

          .blue-input {
            background: #f8fafc !important;
            border: 1.5px solid #e2e8f0 !important;
            transition: all 0.2s ease !important;
          }

          .blue-input:focus {
            background: white !important;
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
          }
        `}</style>
        
        <div className="chatbot-window h-[450px] w-[350px] flex flex-col bg-white rounded-xl border-[1px] border-blue-200 overflow-hidden shadow-lg animate-in slide-in-from-bottom-3 duration-300 fixed bottom-16 right-4">
          <div className="flex justify-between items-center px-6 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
            <div className="flex gap-3">
              <Avatar3D isActive={true} mood={avatarMood} />
              <div className="flex items-start flex-col justify-center">
                <h3 className="text-sm font-semibold leading-none text-blue-800">
                  Sales Rep - SmartRep AI
                </h3>
                <p className="text-[11px] text-blue-600 mt-0.5">{domainName.split('.com')[0]}</p>
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
            className="bg-transparent border-b border-blue-100 px-6 pt-1"
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
                  
                  {/* Contextual Actions */}
                  {!onResponding && chats.length > 1 && (
                    <ContextualActions messages={chats} />
                  )}
                </div>
                <Separator className="bg-blue-100" />
                
                {/* Fixed Bottom Input Section with Blue Theme */}
                <div className="p-3 bg-gradient-to-r from-blue-50 to-white border-t border-blue-100">
                  <form
                    ref={formRef}
                    onSubmit={onChat}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                          {...register('content')}
                          placeholder="Type your message..."
                          className="blue-input pr-10 py-2.5 text-sm rounded-lg focus:outline-none"
                        />
                        <Label
                          htmlFor="file"
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-blue-50 p-1 rounded transition-colors"
                        >
                          <Paperclip className="w-4 h-4 text-blue-500 hover:text-blue-600" />
                        </Label>
                        <input
                          type="file"
                          id="file"
                          className="hidden"
                          {...register('image')}
                        />
                      </div>
                      
                      {/* Send Button */}
                      <Button
                        type="submit"
                        size="icon"
                        className="blue-button rounded-full h-9 w-9 flex-shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      
                      {/* Voice Assistant Button */}
                      <div className="flex-shrink-0">
                        <VoiceAssistant
                          onMessage={handleVoiceMessage}
                          chatRoomId={realtimeMode?.chatroom}
                        />
                      </div>
                    </div>
                    
                    {/* Error Message */}
                    {errors.content && (
                      <p className="text-xs text-red-500 px-1">
                        {errors.content.message}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="help desk" className="px-0">
              <div className="h-[290px] overflow-y-auto overflow-x-hidden px-6 py-3 flex flex-col gap-2.5">
                <div>
                  <CardTitle className="text-sm text-blue-800">Help Desk</CardTitle>
                  <CardDescription className="text-[10px] text-blue-600">
                    Browse from a list of questions people usually ask.
                  </CardDescription>
                </div>
                <Separator orientation="horizontal" className="bg-blue-100" />

                {helpdesk.map((desk) => (
                  <Accordion
                    key={desk.id}
                    trigger={desk.question}
                    content={desk.answer}
                    className="text-blue-800"
                  />
                ))}
              </div>
            </TabsContent>
          </TabsMenu>
          
          {/* Footer */}
          <div className="flex justify-center py-1.5 bg-blue-50 border-t border-blue-200">
            <p className="text-blue-400 text-[10px]">Powered By SmartRep AI</p>
          </div>
        </div>
      </>
    )
  }
)

BotWindow.displayName = 'BotWindow'
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
    
    // Voice recognition setup
    React.useEffect(() => {
      if (typeof window !== 'undefined') {
        const windowWithSpeech = window as WindowWithSpeechRecognition;
        const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = true;
          
          recognition.onresult = (event: SpeechRecognitionEvent) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            setTranscript(transcript);
          };
          
          recognition.onend = () => {
            setIsListening(false);
          };
          
          if (isListening) {
            recognition.start();
          }
          
          return () => {
            recognition.stop();
          };
        }
      }
    }, [isListening]);
    
    // Toggle listening state
    const toggleListening = () => {
      setIsListening(!isListening);
    };
    
    // Submit voice transcript
    React.useEffect(() => {
      if (transcript && !isListening) {
        // Set the input value to the transcript
        const inputElement = document.querySelector('input[name="content"]') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = transcript;
          setTranscript('');
        }
      }
    }, [transcript, isListening]);
    
    return (
      <>
        {/* Add style tag for consistent colors */}
        <style jsx global>{`
          /* Ensure consistent text colors in the chatbot */
          .chatbot-window input,
          .chatbot-window textarea {
            color: #1f2937 !important;
          }
          
          .chatbot-window input::placeholder {
            color: #9ca3af !important;
          }
          
          .chatbot-window .ui-accordion-trigger {
            color: #1f2937 !important;
          }
          
          .chatbot-window .ui-accordion-content {
            color: #4b5563 !important;
          }
        `}</style>
        
        <div className="chatbot-window h-[450px] w-[350px] flex flex-col bg-white rounded-xl border-[1px] border-gray-200 overflow-hidden shadow-lg animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex justify-between items-center px-6 py-2.5 bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
            <div className="flex gap-3">
              <Avatar3D isActive={true} mood={avatarMood} />
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
                  
                  {/* Contextual Actions */}
                  {!onResponding && chats.length > 1 && (
                    <ContextualActions messages={chats} />
                  )}
                </div>
                <form
                  ref={formRef}
                  onSubmit={onChat}
                  className="flex px-6 py-2.5 flex-col flex-1 bg-gray-50 border-t border-gray-100"
                >
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex-1 relative">
                      <Input
                        {...register('content')}
                        placeholder="Type your message..."
                        className="focus-visible:ring-1 focus-visible:ring-blue-200 w-full pl-3.5 pr-2.5 py-1.5 bg-white rounded-lg border border-gray-200 text-xs text-gray-800"
                        style={{ color: '#1f2937' }}
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={toggleListening}
                      className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors h-7 w-7 p-0 rounded-lg shadow-sm`}
                    >
                      {isListening ? <MicOff className="w-3.5 h-3.5 text-white" /> : <Mic className="w-3.5 h-3.5 text-gray-600" />}
                    </Button>
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
                  <CardTitle className="text-sm text-gray-800">Help Desk</CardTitle>
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
                    className="text-gray-800"
                  />
                ))}
              </div>
            </TabsContent>
          </TabsMenu>
          <div className="flex justify-center py-1.5 bg-gray-50 border-t border-gray-100">
            <p className="text-gray-400 text-[10px]">Powered By SmartRep AI</p>
          </div>
        </div>
      </>
    )
  }
)

BotWindow.displayName = 'BotWindow'

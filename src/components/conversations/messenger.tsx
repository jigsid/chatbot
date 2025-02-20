'use client'
import { useChatWindow } from '@/hooks/conversation/use-conversation'
import React from 'react'
import { Loader } from '../loader'
import Bubble from '../chatbot/bubble'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { PaperclipIcon } from 'lucide-react'
import { TypingIndicator } from './typing-indicator'
import { ReadReceipt } from './read-receipt'

type Props = {}

const Messenger = (props: Props) => {
  const {
    messageWindowRef,
    chats,
    loading,
    chatRoom,
    onHandleSentMessage,
    register,
    isTyping,
    readStatus,
    onFileUpload,
  } = useChatWindow()

  return (
    <div className="flex-1 flex flex-col h-0 relative">
      <div className="flex-1 h-0 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="w-full flex-1 h-0 flex flex-col gap-3 pl-5 py-5 chat-window overflow-y-auto"
          >
            {chats.length ? (
              chats.map((chat) => (
                <div key={chat.id} className="relative">
                  <Bubble
                    message={{
                      role: chat.role!,
                      content: chat.message,
                    }}
                    createdAt={chat.createdAt}
                  />
                  {chat.role === 'user' && (
                    <ReadReceipt status={readStatus[chat.id]} />
                  )}
                </div>
              ))
            ) : (
              <div>No Chat Selected</div>
            )}
            {isTyping && <TypingIndicator />}
          </div>
        </Loader>
      </div>
      <form
        onSubmit={onHandleSentMessage}
        className="flex px-3 pt-3 pb-10 flex-col backdrop-blur-sm bg-muted w-full"
      >
        <div className="flex justify-between items-center">
          <Input
            {...register('content')}
            placeholder="Type your message..."
            className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none"
          />
          <label className="cursor-pointer mx-2">
            <input
              type="file"
              className="hidden"
              onChange={onFileUpload}
              accept="image/*,.pdf,.doc,.docx"
            />
            <PaperclipIcon className="text-muted-foreground hover:text-foreground transition-colors" />
          </label>
          <Button
            type="submit"
            className="mt-3 px-7"
            disabled={!chatRoom}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Messenger

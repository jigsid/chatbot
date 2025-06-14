'use client'
import { useChatWindow } from '@/hooks/conversation/use-conversation'
import React from 'react'
import { Loader } from '../loader'
import Bubble from '../chatbot/bubble'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MessageSquareIcon, PaperclipIcon, MessageSquareShare } from 'lucide-react'
import { TypingIndicator } from './typing-indicator'
import { ReadReceipt } from './read-receipt'
import { Badge } from '../ui/badge'

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
    customerEmail
  } = useChatWindow()

  // Check if this chat is from the embedded chatbot
  const isEmbeddedChat = chatRoom?.id?.startsWith('embedded-') || false;

  return (
    <div className="flex-1 flex flex-col h-0 relative">
      {chatRoom && (
        <div className="bg-muted py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{customerEmail || 'Chat'}</span>
            {isEmbeddedChat && (
              <Badge variant="outline" className="ml-2 flex items-center gap-1">
                <MessageSquareShare className="h-3 w-3" />
                <span className="text-xs">Embedded Chat</span>
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {chatRoom?.createdAt && `Started ${new Date(chatRoom.createdAt).toLocaleDateString()}`}
          </div>
        </div>
      )}
      <div className="flex-1 h-0 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="w-full flex-1 h-0 flex flex-col gap-3 pl-5 py-5 pb-16 chat-window overflow-y-auto"
          >
            {chatRoom ? (
              chats.length ? (
                chats.map((chat) => (
                  <div key={chat.id} className="relative">
                    <Bubble
                      message={{
                        role: chat.role || 'user',
                        content: chat.message || chat.content || '',
                      }}
                      createdAt={chat.createdAt}
                    />
                    {chat.role === 'user' && (
                      <ReadReceipt status={readStatus[chat.id]} />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground">No messages in this conversation yet</div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <MessageSquareIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-xl font-medium mb-2">No Chat Selected</div>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the sidebar to view messages or respond to customers.
                </p>
              </div>
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
            placeholder={chatRoom ? "Type your message..." : "Select a chat to start messaging"}
            className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none"
            disabled={!chatRoom}
          />
          <label className={`cursor-pointer mx-2 ${!chatRoom ? 'opacity-50' : ''}`}>
            <input
              type="file"
              className="hidden"
              onChange={onFileUpload}
              accept="image/*,.pdf,.doc,.docx"
              disabled={!chatRoom}
            />
            <PaperclipIcon className={`text-muted-foreground ${chatRoom ? 'hover:text-foreground' : ''} transition-colors`} />
          </label>
          <Button
            type="submit"
            className="mt-3 px-7"
            disabled={!chatRoom}
          >
            Send
          </Button>
        </div>
        {chatRoom && isEmbeddedChat && (
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquareShare className="h-3 w-3" />
              Your message will appear as the chatbot on the customer's website
            </span>
          </div>
        )}
      </form>
    </div>
  )
}

export default Messenger

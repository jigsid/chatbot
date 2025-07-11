'use client'
import { useConversation } from '@/hooks/conversation/use-conversation'
import React, { useEffect } from 'react'
import TabsMenu from '../tabs'
import { TABS_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import ConversationSearch from './search'
import { Loader } from '../loader'
import ChatCard from './chat-card'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'

type Props = {
  domains?:
    | {
        name: string
        id: string
        icon: string
      }[]
    | undefined
}

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages, setValue } =
    useConversation()

  useEffect(() => {
    if (domains?.length) {
      setValue('domain', domains[0].id);
    }
  }, [domains, setValue]);

  const isExpired = (createdAt: Date | undefined) => {
    // Return false if createdAt is undefined
    if (!createdAt) return false;
    
    // Example logic: consider chat expired if older than 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return new Date(createdAt) < thirtyDaysAgo
  }

  const isStarred = (room: any) => {
    // Safely check if the room has a starred property
    return room && room.chatRoom && room.chatRoom[0] && room.chatRoom[0].starred === true
  }

  return (
    <div className="py-3 px-0 w-[320px] min-w-[320px] flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center px-4 mb-2">
        <h3 className="text-sm font-medium">Conversations</h3>
      </div>
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="unread" className="h-full flex flex-col overflow-hidden">
          <ConversationSearch
            domains={domains}
            register={register}
          />
          <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room?.chatRoom?.[0]?.message?.[0]?.seen}
                    id={room?.chatRoom?.[0]?.id}
                    onChat={() => onGetActiveChatMessages(room?.chatRoom?.[0]?.id)}
                    createdAt={room?.chatRoom?.[0]?.message?.[0]?.createdAt}
                    key={room?.chatRoom?.[0]?.id}
                    title={room?.email || 'Unknown'}
                    description={room?.chatRoom?.[0]?.message?.[0]?.message || 'No message'}
                  />
                ))
              ) : (
                <CardDescription className="p-4">No chats for your domain</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="all" className="h-full flex flex-col overflow-hidden">
          <Separator orientation="horizontal" className="mt-5" />
          <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room?.chatRoom?.[0]?.message?.[0]?.seen}
                    id={room?.chatRoom?.[0]?.id}
                    onChat={() => onGetActiveChatMessages(room?.chatRoom?.[0]?.id)}
                    createdAt={room?.chatRoom?.[0]?.message?.[0]?.createdAt}
                    key={room?.chatRoom?.[0]?.id}
                    title={room?.email || 'Unknown'}
                    description={room?.chatRoom?.[0]?.message?.[0]?.message || 'No message'}
                  />
                ))
              ) : (
                <CardDescription className="p-4">No chats available</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="expired" className="h-full flex flex-col overflow-hidden">
          <Separator orientation="horizontal" className="mt-5" />
          <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms
                  .filter(room => room?.chatRoom?.[0]?.createdAt && isExpired(room.chatRoom[0].createdAt))
                  .map((room) => (
                    <ChatCard
                      seen={room?.chatRoom?.[0]?.message?.[0]?.seen}
                      id={room?.chatRoom?.[0]?.id}
                      onChat={() => onGetActiveChatMessages(room?.chatRoom?.[0]?.id)}
                      createdAt={room?.chatRoom?.[0]?.message?.[0]?.createdAt}
                      key={room?.chatRoom?.[0]?.id}
                      title={room?.email || 'Unknown'}
                      description={room?.chatRoom?.[0]?.message?.[0]?.message || 'No message'}
                    />
                  ))
              ) : (
                <CardDescription className="p-4">No expired chats</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="starred" className="h-full flex flex-col overflow-hidden">
          <Separator orientation="horizontal" className="mt-5" />
          <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms
                  .filter(room => isStarred(room))
                  .map((room) => (
                    <ChatCard
                      seen={room?.chatRoom?.[0]?.message?.[0]?.seen}
                      id={room?.chatRoom?.[0]?.id}
                      onChat={() => onGetActiveChatMessages(room?.chatRoom?.[0]?.id)}
                      createdAt={room?.chatRoom?.[0]?.message?.[0]?.createdAt}
                      key={room?.chatRoom?.[0]?.id}
                      title={room?.email || 'Unknown'}
                      description={room?.chatRoom?.[0]?.message?.[0]?.message || 'No message'}
                    />
                  ))
              ) : (
                <CardDescription className="p-4">No starred chats</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
      </TabsMenu>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }
      `}</style>
    </div>
  )
}

export default ConversationMenu

import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return (
    <ChatProvider>
      <div className="flex h-screen w-full bg-white dark:bg-neutral-900">
        <SideBar domains={authenticated.domain} />
        <div className="w-full h-screen flex flex-col ml-[60px] transition-all duration-300 ease-in-out">
          {children}
        </div>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout

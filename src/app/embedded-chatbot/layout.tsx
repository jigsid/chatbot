import ChatbotThemeLock from '@/app/chatbot/theme-lock'

export default function EmbeddedChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-hidden bg-white text-slate-900">
      <ChatbotThemeLock />
      {children}
    </div>
  )
}

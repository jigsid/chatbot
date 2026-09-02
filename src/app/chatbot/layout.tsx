import ChatbotThemeLock from './theme-lock'

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent text-slate-900">
      <ChatbotThemeLock />
      {children}
    </div>
  )
}

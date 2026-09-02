export default function EmbeddedChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-hidden bg-white text-slate-900">
      {children}
    </div>
  )
}

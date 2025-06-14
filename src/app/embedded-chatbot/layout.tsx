export default function EmbeddedChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'SmartRep AI Embedded Chatbot',
  description: 'Embedded chatbot interface for SmartRep AI',
} 
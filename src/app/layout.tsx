import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/context/them-provider'
import { VapiProvider } from '@/context/vapi-provider'
// import ChatbotIframe from '@/components/chatbotIframe'

// Force dynamic rendering
import '../app/forced-dynamic'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

// Force dynamic rendering at the root layout level
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'SmartRep AI',
  description: 'Next Level AI chatbot to service your website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jakarta.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <VapiProvider>
              {children}
              <Toaster />
              {/* <ChatbotIframe /> */}
            </VapiProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

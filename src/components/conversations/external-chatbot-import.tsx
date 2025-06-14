'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useChatWindow } from '@/hooks/conversation/use-conversation'

export function ExternalChatbotImport() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [apiUrl, setApiUrl] = useState('')
  const { importExternalChatbotMessages, loading } = useChatWindow()

  const handleImport = async () => {
    if (!email || !apiUrl) return
    
    await importExternalChatbotMessages(email, apiUrl)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Import External Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import External Chatbot Messages</DialogTitle>
          <DialogDescription>
            Import messages from an external chatbot by providing the user's email and the API URL.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-url" className="text-right">
              API URL
            </Label>
            <Input
              id="api-url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://example.com/api/chatbot"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleImport} disabled={!email || !apiUrl || loading}>
            {loading ? 'Importing...' : 'Import Messages'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
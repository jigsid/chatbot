'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useVapi } from '@/context/vapi-provider'
import { toast } from '@/components/ui/use-toast'

export default function VoiceAssistantSettings() {
  const { config, updateConfig } = useVapi()
  const [apiKey, setApiKey] = useState('')
  const [assistantId, setAssistantId] = useState('')

  useEffect(() => {
    setApiKey(config.apiKey)
    setAssistantId(config.assistantId)
  }, [config])

  const handleSave = () => {
    updateConfig({
      apiKey,
      assistantId
    })
    
    toast({
      title: 'Settings saved',
      description: 'Voice assistant settings have been updated.'
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Voice Assistant Settings</h1>
      
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Vapi Configuration</CardTitle>
          <CardDescription>
            Configure your Vapi voice assistant integration. You can get your API key and assistant ID from the Vapi dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Vapi API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Vapi API key"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assistant-id">Assistant ID</Label>
            <Input
              id="assistant-id"
              value={assistantId}
              onChange={(e) => setAssistantId(e.target.value)}
              placeholder="Enter your assistant ID"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Settings</Button>
        </CardFooter>
      </Card>
      
      <Card className="w-full max-w-2xl mt-6">
        <CardHeader>
          <CardTitle>Voice Assistant Information</CardTitle>
          <CardDescription>
            Learn more about the voice assistant integration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The voice assistant uses Vapi.ai to provide voice interaction capabilities to your chatbot.
            Users can speak to the assistant and receive spoken responses.
          </p>
          <h3 className="text-lg font-semibold">Features:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Natural voice conversations with your chatbot</li>
            <li>Real-time speech-to-text and text-to-speech</li>
            <li>Integration with your existing chatbot flows</li>
            <li>Custom voice and personality options via Vapi dashboard</li>
          </ul>
          <p className="mt-4">
            <a 
              href="https://docs.vapi.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Vapi documentation
            </a> to learn more about configuring your voice assistant.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 
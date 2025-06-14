'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function EmbeddedChatbotDemo() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }
  
  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Embedded Chatbot</h1>
        <Link href="/embedded-chatbot-example.html" target="_blank">
          <Button variant="outline" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View Demo
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="integration">
        <TabsList className="mb-6">
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integration">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Integration</CardTitle>
                <CardDescription>
                  Add the chatbot to your website with a single line of code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-md relative">
                  <pre className="font-mono text-sm">
                    <code>{`<script src="${window.location.origin}/embed.js"></script>`}</code>
                  </pre>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                    onClick={() => copyToClipboard(`<script src="${window.location.origin}/embed.js"></script>`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pre-set User Email</CardTitle>
                <CardDescription>
                  If your users are already logged in, pre-set their email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-md relative">
                  <pre className="font-mono text-sm">
                    <code>{`<script>
  window.smartRepUserEmail = "user@example.com";
</script>
<script src="${window.location.origin}/embed.js"></script>`}</code>
                  </pre>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                    onClick={() => copyToClipboard(`<script>\n  window.smartRepUserEmail = "user@example.com";\n</script>\n<script src="${window.location.origin}/embed.js"></script>`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customization">
          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
              <CardDescription>
                Edit the embed.js file to customize the chatbot appearance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Button Color</h3>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md">
                    <pre className="font-mono text-sm">
                      <code>{`const config = {
  // ...
  buttonColor: '#0f172a', // Change to your preferred color
  // ...
};`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Welcome Message</h3>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md">
                    <pre className="font-mono text-sm">
                      <code>{`const config = {
  // ...
  welcomeMessage: 'Hello! How can I help you today?', // Change to your custom message
  // ...
};`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Chat Window Size</h3>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md">
                    <pre className="font-mono text-sm">
                      <code>{`.smartrep-chat-container {
  // ...
  width: 350px; // Change width
  height: 500px; // Change height
  // ...
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>JavaScript API</CardTitle>
              <CardDescription>
                Control the chatbot programmatically using JavaScript
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Open the chatbot</h3>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md relative">
                    <pre className="font-mono text-sm">
                      <code>SmartRepChat.open();</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                      onClick={() => copyToClipboard('SmartRepChat.open();')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Close the chatbot</h3>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md relative">
                    <pre className="font-mono text-sm">
                      <code>SmartRepChat.close();</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                      onClick={() => copyToClipboard('SmartRepChat.close();')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Set user email</h3>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md relative">
                    <pre className="font-mono text-sm">
                      <code>SmartRepChat.setUserEmail("user@example.com");</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                      onClick={() => copyToClipboard('SmartRepChat.setUserEmail("user@example.com");')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              For more details, check the embedded chatbot documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/EMBEDDED_CHATBOT_INTEGRATION.md" target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Documentation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
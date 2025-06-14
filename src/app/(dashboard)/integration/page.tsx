import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { CodeBlock } from '@/components/ui/code-block'

export default function IntegrationPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Chatbot Integration</h1>
        <p className="text-muted-foreground">
          Integrate your external chatbot with SmartRep AI and manage all your conversations in one place.
        </p>
      </div>

      <Tabs defaultValue="javascript">
        <TabsList className="mb-4">
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="javascript">
          <Card>
            <CardHeader>
              <CardTitle>JavaScript Integration</CardTitle>
              <CardDescription>
                Add this script to your website to integrate your chatbot with SmartRep AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Step 1: Add the script to your page</h3>
              <CodeBlock language="html" code={`<script src="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/chatbot-integration.js"></script>`} />
              
              <Separator className="my-6" />
              
              <h3 className="font-medium mb-2">Step 2: Initialize the integration</h3>
              <CodeBlock language="javascript" code={`
// Initialize with your API endpoint and user's email
SmartRepAI.init(
  "${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/api/chatbot-integration", 
  "user@example.com"
);
              `} />
              
              <Separator className="my-6" />
              
              <h3 className="font-medium mb-2">Step 3: Send messages</h3>
              <CodeBlock language="javascript" code={`
// Send a user message
SmartRepAI.sendMessage("Hello, I need help with my order", "user");

// Send a bot response
SmartRepAI.sendMessage("I'll be happy to help you with your order", "assistant");
              `} />
              
              <Separator className="my-6" />
              
              <h3 className="font-medium mb-2">Advanced: Auto-detect messages</h3>
              <CodeBlock language="javascript" code={`
// Automatically detect and send all messages with the class "chat-message"
SmartRepAI.detectMessages(".chat-message", "data-role");

// Observe a chat container for new messages
SmartRepAI.observe("#chat-container", ".chat-message", "data-role");
              `} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Direct API endpoints for integration with SmartRep AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Send a message</h3>
              <p className="text-sm text-muted-foreground mb-4">
                POST /api/chatbot-integration
              </p>
              <CodeBlock language="json" code={`
// Request
{
  "email": "user@example.com",
  "message": "Hello, I need help with my order",
  "role": "user" // or "assistant"
}

// Response
{
  "success": true,
  "chatRoomId": "123e4567-e89b-12d3-a456-426614174000"
}
              `} />
              
              <Separator className="my-6" />
              
              <h3 className="font-medium mb-2">Get chat history</h3>
              <p className="text-sm text-muted-foreground mb-4">
                GET /api/chatbot-integration?email=user@example.com
              </p>
              <CodeBlock language="json" code={`
// Response
{
  "chatRoomId": "123e4567-e89b-12d3-a456-426614174000",
  "messages": [
    {
      "id": "abc123",
      "message": "Hello, I need help with my order",
      "role": "user",
      "createdAt": "2023-06-15T14:30:00.000Z",
      "seen": true
    },
    {
      "id": "def456",
      "message": "I'll be happy to help you with your order",
      "role": "assistant",
      "createdAt": "2023-06-15T14:30:05.000Z",
      "seen": true
    }
  ]
}
              `} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Integration Examples</CardTitle>
              <CardDescription>
                Common use cases and examples for integrating with SmartRep AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Example 1: Basic Integration</h3>
              <CodeBlock language="html" code={`
<div id="chat-container">
  <div class="chat-messages">
    <!-- Messages will appear here -->
  </div>
  
  <div class="chat-input">
    <input type="text" id="message-input" placeholder="Type your message..." />
    <button id="send-button">Send</button>
  </div>
</div>

<script src="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/chatbot-integration.js"></script>
<script>
  // Initialize the integration
  SmartRepAI.init(
    "${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/api/chatbot-integration", 
    "user@example.com"
  );
  
  // Handle sending messages
  document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
      // Add message to UI
      const messageElement = document.createElement('div');
      messageElement.className = 'user-message';
      messageElement.textContent = message;
      document.querySelector('.chat-messages').appendChild(messageElement);
      
      // Send to SmartRep
      SmartRepAI.sendMessage(message, 'user');
      
      // Clear input
      messageInput.value = '';
    }
  });
</script>
              `} />
              
              <Separator className="my-6" />
              
              <h3 className="font-medium mb-2">Example 2: Automatic Message Detection</h3>
              <CodeBlock language="html" code={`
<div id="chat-container">
  <div class="chat-messages">
    <div class="chat-message" data-role="user">Hello, I need help</div>
    <div class="chat-message" data-role="assistant">How can I assist you?</div>
  </div>
</div>

<script src="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/chatbot-integration.js"></script>
<script>
  // Initialize the integration
  SmartRepAI.init(
    "${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/api/chatbot-integration", 
    "user@example.com"
  );
  
  // Detect existing messages
  SmartRepAI.detectMessages(".chat-message", "data-role");
  
  // Observe for new messages
  SmartRepAI.observe("#chat-container", ".chat-message", "data-role");
  
  // Function to add a new message
  function addMessage(text, role) {
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.setAttribute('data-role', role);
    messageElement.textContent = text;
    document.querySelector('.chat-messages').appendChild(messageElement);
  }
</script>
              `} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

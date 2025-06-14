import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ExternalChatbotPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">External Chatbot Integration</h1>
      <p className="text-muted-foreground mb-8">
        Connect your external chatbot with SmartRep AI and manage all conversations in one place.
      </p>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Add the Script to Your Website</CardTitle>
            <CardDescription>
              Include our integration script in your external chatbot website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-950 text-white p-4 rounded-md overflow-x-auto">
              <code>{`<script src="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/external-chatbot.js"></script>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Initialize the Integration</CardTitle>
            <CardDescription>
              Set up the integration with the user's email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-950 text-white p-4 rounded-md overflow-x-auto">
              <code>{`<script>
  // Initialize with your webhook URL and the user's email
  SmartRepChatbot.init(
    "${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/api/external-chatbot-webhook", 
    "user@example.com"
  );
</script>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Send Messages to SmartRep</CardTitle>
            <CardDescription>
              Send messages from your chatbot to SmartRep AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-950 text-white p-4 rounded-md overflow-x-auto">
              <code>{`<script>
  // Send a user message
  SmartRepChatbot.send("Hello, I need help with my order", "user");

  // Send a bot response
  SmartRepChatbot.send("I'll be happy to help you with your order", "assistant");
</script>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 4: Automatic Message Capture</CardTitle>
            <CardDescription>
              Automatically capture and send messages from your chatbot UI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-950 text-white p-4 rounded-md overflow-x-auto">
              <code>{`<script>
  // Capture all messages with the class "chat-message"
  SmartRepChatbot.capture(".chat-message", "data-role");

  // Watch for new messages in the chat container
  SmartRepChatbot.watch("#chat-container", ".chat-message", "data-role");
</script>`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Implementation</CardTitle>
            <CardDescription>
              A complete example of how to integrate with SmartRep AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-950 text-white p-4 rounded-md overflow-x-auto">
              <code>{`<!DOCTYPE html>
<html>
<head>
  <title>External Chatbot</title>
  <script src="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/external-chatbot.js"></script>
</head>
<body>
  <div id="chat-container">
    <div class="chat-messages">
      <div class="chat-message" data-role="assistant">Hello! How can I help you today?</div>
      <!-- Chat messages will appear here -->
    </div>
    
    <div class="chat-input">
      <input type="text" id="message-input" placeholder="Type your message...">
      <button id="send-button">Send</button>
    </div>
  </div>

  <script>
    // Initialize the integration
    SmartRepChatbot.init(
      "${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/api/external-chatbot-webhook", 
      "user@example.com"
    );
    
    // Capture existing messages
    SmartRepChatbot.capture(".chat-message", "data-role");
    
    // Watch for new messages
    SmartRepChatbot.watch("#chat-container", ".chat-message", "data-role");
    
    // Handle sending messages
    document.getElementById('send-button').addEventListener('click', function() {
      const input = document.getElementById('message-input');
      const message = input.value.trim();
      
      if (message) {
        // Add message to UI
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message';
        userMessage.setAttribute('data-role', 'user');
        userMessage.textContent = message;
        document.querySelector('.chat-messages').appendChild(userMessage);
        
        // Clear input
        input.value = '';
        
        // Simulate bot response (in a real chatbot, this would be your bot's response)
        setTimeout(function() {
          const botMessage = document.createElement('div');
          botMessage.className = 'chat-message';
          botMessage.setAttribute('data-role', 'assistant');
          botMessage.textContent = "I received your message: " + message;
          document.querySelector('.chat-messages').appendChild(botMessage);
        }, 1000);
      }
    });
  </script>
</body>
</html>`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
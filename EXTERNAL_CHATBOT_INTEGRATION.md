# External Chatbot Integration

This document explains how to integrate an external chatbot with SmartRep AI.

## Overview

The integration allows:
1. External chatbot messages to be sent to SmartRep AI
2. SmartRep AI to send messages back to the external chatbot
3. All conversations to be stored in SmartRep AI's database
4. Real-time updates in the SmartRep AI conversation interface

## Setup Instructions

### 1. Environment Configuration

Add the following to your `.env` file:

```
EXTERNAL_CHATBOT_URL=https://your-external-chatbot-api.com/messages
```

This is the URL where SmartRep AI will send messages when users reply from the SmartRep interface.

### 2. Include the Integration Script

Add the SmartRep integration script to your external chatbot website:

```html
<script src="https://your-smartrep-domain.com/external-chatbot.js"></script>
```

### 3. Initialize the Integration

Initialize the script with the webhook URL and the user's email:

```javascript
// Initialize when you have the user's email
SmartRepChatbot.init(
  "https://your-smartrep-domain.com/api/external-chatbot-webhook",
  "user@example.com"
);
```

### 4. Send Messages to SmartRep

Send messages from your external chatbot to SmartRep:

```javascript
// Send a user message
SmartRepChatbot.send("Hello, I need help with my order", "user");

// Send a bot response
SmartRepChatbot.send("I'll be happy to help you with your order", "assistant");
```

### 5. Automatic Message Capture (Optional)

You can automatically capture and send messages from your chatbot UI:

```javascript
// Capture all messages with the class "chat-message"
SmartRepChatbot.capture(".chat-message", "data-role");

// Watch for new messages in the chat container
SmartRepChatbot.watch("#chat-container", ".chat-message", "data-role");
```

## Testing the Integration

1. Start your SmartRep AI application
2. Open the example external chatbot: `http://localhost:3000/external-chatbot-example.html`
3. Enter an email address and start chatting
4. Check the SmartRep AI conversation page to see the messages appear

## Troubleshooting

### Messages not appearing in SmartRep AI

- Check that the webhook URL is correct
- Ensure the user's email is being sent correctly
- Check the browser console for any errors
- Verify that the SmartRep AI server is running

### Messages not being sent to external chatbot

- Check that `EXTERNAL_CHATBOT_URL` is set correctly in your `.env` file
- Ensure your external chatbot API is properly configured to receive messages

## API Reference

### Webhook Endpoint

**POST /api/external-chatbot-webhook**

Receives messages from external chatbots.

Request body:
```json
{
  "email": "user@example.com",
  "message": "Hello, I need help with my order",
  "role": "user" // or "assistant"
}
```

Response:
```json
{
  "success": true,
  "chatRoomId": "123e4567-e89b-12d3-a456-426614174000",
  "messageId": "abc123"
}
```

### JavaScript API

- `SmartRepChatbot.init(webhookUrl, email)`: Initialize the integration
- `SmartRepChatbot.send(message, role)`: Send a message to SmartRep
- `SmartRepChatbot.capture(selector, roleAttribute)`: Capture existing messages
- `SmartRepChatbot.watch(containerSelector, messageSelector, roleAttribute)`: Watch for new messages 
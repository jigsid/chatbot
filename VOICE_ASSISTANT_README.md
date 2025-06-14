# Voice Assistant Integration for SmartRep AI

This document provides instructions on how to set up and use the voice assistant feature with SmartRep AI's chatbot.

## Overview

The voice assistant integration uses [Vapi.ai](https://vapi.ai) to enable voice conversations with your chatbot. Users can speak to the assistant and receive spoken responses, creating a more natural and engaging interaction experience.

## Setup Instructions

### 1. Create a Vapi Account

1. Go to [Vapi.ai](https://vapi.ai) and create an account
2. Once registered, navigate to your dashboard

### 2. Create a Vapi Assistant

1. In the Vapi dashboard, create a new assistant
2. Configure the assistant with appropriate settings:
   - Select a voice model (e.g., 11labs, OpenAI, etc.)
   - Configure the language model (e.g., GPT-4, Claude, etc.)
   - Set up the assistant's personality and behavior

### 3. Get Your API Keys

1. In the Vapi dashboard, go to the API Keys section
2. Create a new API key for your project
3. Copy the API key and your assistant ID

### 4. Configure SmartRep AI

1. Log in to your SmartRep AI dashboard
2. Navigate to "Voice Assistant" in the sidebar
3. Enter your Vapi API key and assistant ID
4. Save the settings

## Using the Voice Assistant

Once configured, the voice assistant will be available in your chatbot interface:

1. In the chatbot window, you'll see a phone icon button next to the send button
2. Click the phone icon to start a voice conversation
3. When the call is active, you can:
   - Speak to the assistant and it will respond with voice
   - Click the mute button to mute your microphone
   - Click the end call button to end the voice conversation

## Integration with Existing Chatbot

The voice assistant is fully integrated with your existing chatbot:

- Voice conversations appear in the chat history
- Context from text conversations is maintained in voice conversations
- All chatbot features (appointment booking, information retrieval, etc.) are available via voice

## Webhook Configuration (Optional)

For advanced use cases, you can configure a webhook in your Vapi dashboard:

1. In the Vapi dashboard, go to Webhooks
2. Add a new webhook with the URL: `https://your-domain.com/api/vapi-webhook`
3. This enables additional features like conversation analytics and custom event handling

## Troubleshooting

If you encounter issues with the voice assistant:

1. **No sound**: Check that your browser has permission to use your microphone
2. **Assistant not responding**: Verify your API keys are correct in the settings
3. **Poor voice quality**: Try using a different voice model in your Vapi assistant settings
4. **Browser compatibility**: The voice assistant works best in Chrome, Edge, and Safari

## Support

If you need assistance with the voice assistant feature:

- Check the [Vapi documentation](https://docs.vapi.ai) for technical details
- Contact SmartRep AI support at support@smartrep.ai
- Visit our help center at help.smartrep.ai

---

© SmartRep AI - Voice Assistant Documentation 
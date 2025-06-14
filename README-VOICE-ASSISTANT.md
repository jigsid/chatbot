# Voice Assistant for SmartRep AI

This README provides instructions on how to set up and use the voice assistant feature with SmartRep AI's embedded chatbot.

## Overview

The voice assistant integration uses [Vapi.ai](https://vapi.ai) to enable voice conversations with your chatbot. Users can speak to the assistant and receive spoken responses, creating a more natural and engaging interaction experience.

## Quick Setup

1. Install the Vapi SDK:
```bash
npm install @vapi-ai/web
```

2. Get your Vapi API key and assistant ID from [Vapi.ai](https://vapi.ai)

3. Update the configuration with your API key and assistant ID:
```bash
npm run update-vapi your_api_key your_assistant_id
```

4. Start your development server:
```bash
npm run dev
```

5. Navigate to the embedded chatbot page and test the voice assistant

## Manual Configuration

If you prefer to update the configuration manually:

1. Open the file `src/config/vapi.ts`
2. Replace the placeholders with your actual Vapi API key and assistant ID:
```typescript
export const VAPI_CONFIG = {
  API_KEY: "your_actual_api_key_here",
  ASSISTANT_ID: "your_assistant_id_here"
}
```

## How It Works

The voice assistant integration consists of several components:

1. **VoiceAssistant Component**: A React component that provides the voice interface
2. **Vapi Configuration**: A configuration file that stores your API key and assistant ID
3. **Integration with Chatbot**: The voice assistant is integrated with the existing chatbot UI

When a user clicks the phone icon, the voice assistant starts listening and converts speech to text. The text is then sent to the chatbot backend, and the response is converted back to speech.

## Features

- **Voice-to-Text**: Convert user speech to text
- **Text-to-Speech**: Convert chatbot responses to speech
- **Real-Time Conversation**: Natural, real-time voice conversations
- **Visual Feedback**: UI indicators for listening and speaking states
- **Mute Option**: Ability to mute the microphone during a call

## Customization

You can customize the voice assistant by:

1. Changing the voice model in your Vapi dashboard
2. Adjusting the language model settings
3. Modifying the UI components in `src/components/chatbotIframe/voice-assistant.tsx`

## Troubleshooting

If you encounter issues:

1. **Browser Permissions**: Ensure your browser has permission to use the microphone
2. **API Key**: Verify your Vapi API key is correct
3. **Console Errors**: Check the browser console for any error messages
4. **Browser Compatibility**: Test in Chrome, Edge, or Safari if experiencing issues

## Additional Resources

- [Vapi Documentation](https://docs.vapi.ai)
- [Setup Guide](./VAPI_SETUP.md) - Detailed setup instructions
- [Script Documentation](./scripts/update-vapi-config.js) - Documentation for the configuration script

## Support

If you need assistance with the voice assistant feature, contact support@smartrep.ai 
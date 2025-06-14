# Vapi Voice Assistant Setup Guide

This guide will help you set up the Vapi voice assistant integration with your SmartRep AI chatbot.

## Step 1: Get Your Vapi API Key

1. Go to [Vapi.ai](https://vapi.ai) and create an account
2. Once registered, navigate to your dashboard
3. Go to the API Keys section and create a new API key
4. Copy the API key for use in the next step

## Step 2: Configure Your Assistant

1. In the Vapi dashboard, create a new assistant or use an existing one
2. Configure the assistant with your preferred settings:
   - Select a voice model (e.g., 11labs, OpenAI, etc.)
   - Configure the language model (e.g., GPT-4, Claude, etc.)
   - Set up the assistant's personality and behavior
3. Copy the assistant ID for use in the next step

## Step 3: Update the Configuration File

1. Open the file `src/config/vapi.ts` in your project
2. Replace the placeholder API key with your actual Vapi API key:

```typescript
export const VAPI_CONFIG = {
  API_KEY: "089ed132-b99b-4d1f-a61f-a99270f0a723", // Replace with your actual API key
  ASSISTANT_ID: "4c472639-620d-4f31-ac4b-ba5149af4381" // Replace with your actual assistant ID
}
```

3. Save the file

## Step 4: Test the Voice Assistant

1. Start your development server:
```
npm run dev
```

2. Navigate to your embedded chatbot page
3. Enter an email address to start the chat
4. Click the phone icon to start a voice conversation
5. Speak to the assistant and verify that it responds correctly

## Troubleshooting

If you encounter issues with the voice assistant:

1. **No sound**: Check that your browser has permission to use your microphone
2. **Assistant not responding**: Verify your API key and assistant ID are correct
3. **Console errors**: Check the browser console for any error messages
4. **Browser compatibility**: The voice assistant works best in Chrome, Edge, and Safari

## Additional Configuration

For advanced configuration options, refer to the [Vapi documentation](https://docs.vapi.ai).

You can customize your voice assistant further by:

1. Setting up a webhook for advanced integration
2. Customizing the assistant's voice and personality
3. Implementing custom tools and functions

If you need assistance, contact support@smartrep.ai 
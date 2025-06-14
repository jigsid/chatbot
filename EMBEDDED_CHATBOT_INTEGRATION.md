# SmartRep AI Embedded Chatbot Integration

This document explains how to integrate the SmartRep AI embedded chatbot into your website.

## Overview

The SmartRep AI embedded chatbot allows you to add a fully functional AI chatbot to your website with minimal setup. The chatbot:

1. Appears as a floating chat button in the corner of your website
2. Opens a chat window when clicked
3. Connects to the SmartRep AI backend for intelligent responses
4. Stores conversations in the SmartRep AI database
5. Provides a seamless user experience

## Integration Methods

There are two ways to integrate the chatbot:

### 1. Simple Script Tag

The easiest way to add the chatbot to your website is by including the embed script:

```html
<script src="https://your-smartrep-domain.com/embed.js"></script>
```

### 2. Pre-set User Email

If your users are already logged in, you can pre-set their email:

```html
<script>
  window.smartRepUserEmail = "user@example.com";
</script>
<script src="https://your-smartrep-domain.com/embed.js"></script>
```

## JavaScript API

The chatbot exposes a JavaScript API that you can use to control it:

```javascript
// Open the chatbot
SmartRepChat.open();

// Close the chatbot
SmartRepChat.close();

// Set the user's email
SmartRepChat.setUserEmail("user@example.com");
```

## Customization

You can customize the appearance of the chatbot by modifying the embed.js file:

- Change the button color
- Update the welcome message
- Modify the chat window size
- Customize the chat interface

## Example Implementation

An example implementation is available at:

```
https://your-smartrep-domain.com/embedded-chatbot-example.html
```

This example demonstrates:
- How to add the chatbot to a website
- How to control the chatbot with JavaScript
- How to pre-set user information

## Technical Details

### How It Works

1. The embed.js script creates a floating button on your website
2. When clicked, it opens an iframe containing the embedded chatbot interface
3. The iframe loads the /embedded-chatbot route from your SmartRep AI application
4. Messages are sent to the /api/external-chatbot-webhook endpoint
5. Responses are delivered in real-time using Pusher

### Security Considerations

- The chatbot uses postMessage for communication between the iframe and parent window
- Origin verification is implemented to prevent cross-site scripting attacks
- User data is stored securely in the SmartRep AI database

## Troubleshooting

### Chatbot Not Appearing

- Check that the embed.js script is being loaded correctly
- Verify that there are no JavaScript errors in the console
- Ensure that the script is loaded after the DOM is ready

### Messages Not Being Sent

- Check that the user's email is set correctly
- Verify that the webhook URL is accessible
- Ensure that Pusher is configured correctly

### Styling Issues

- Check for CSS conflicts with your website
- Inspect the chatbot elements using browser developer tools
- Modify the embed.js styles as needed

## Support

For additional support, please contact:

- Email: support@smartrep.ai
- Documentation: https://docs.smartrep.ai/embedded-chatbot 
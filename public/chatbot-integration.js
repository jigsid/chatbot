/**
 * SmartRep AI Chatbot Integration Script
 * 
 * This script allows external websites to integrate with the SmartRep AI chatbot system.
 * It captures chat messages and sends them to the SmartRep API.
 * 
 * Usage:
 * 1. Include this script in your webpage
 * 2. Initialize with your API endpoint URL
 * 3. Call sendMessageToSmartRep() when a message is sent or received
 */

(function() {
  // Configuration
  let apiEndpoint = '';
  let userEmail = '';
  let initialized = false;

  // Initialize the integration
  window.initSmartRepIntegration = function(endpoint, email) {
    if (!endpoint || !email) {
      console.error('SmartRep Integration: API endpoint and email are required');
      return false;
    }

    apiEndpoint = endpoint;
    userEmail = email;
    initialized = true;
    
    console.log('SmartRep Integration: Initialized successfully');
    return true;
  };

  // Send a message to SmartRep
  window.sendMessageToSmartRep = async function(message, role = 'user') {
    if (!initialized) {
      console.error('SmartRep Integration: Not initialized. Call initSmartRepIntegration first');
      return false;
    }

    if (!message) {
      console.error('SmartRep Integration: Message is required');
      return false;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          message,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log('SmartRep Integration: Message sent successfully', data);
      return data;
    } catch (error) {
      console.error('SmartRep Integration: Failed to send message', error);
      return false;
    }
  };

  // Listen for messages from SmartRep (for future use)
  window.listenForSmartRepMessages = function(callback) {
    // This would be implemented with WebSockets or Server-Sent Events
    // For now, it's a placeholder for future functionality
    console.warn('SmartRep Integration: Message listening not yet implemented');
  };

  // Auto-detect chatbot messages on the page (optional)
  window.autoDetectChatbotMessages = function(messageSelector, roleAttribute = 'data-role') {
    if (!initialized) {
      console.error('SmartRep Integration: Not initialized. Call initSmartRepIntegration first');
      return false;
    }

    // Find all message elements
    const messageElements = document.querySelectorAll(messageSelector);
    
    // Process each message
    messageElements.forEach(async (element) => {
      const message = element.textContent.trim();
      const role = element.getAttribute(roleAttribute) || 'user';
      
      // Only process elements that haven't been sent yet
      if (!element.dataset.smartrepSent && message) {
        await window.sendMessageToSmartRep(message, role);
        element.dataset.smartrepSent = 'true';
      }
    });
    
    return true;
  };

  // Add a MutationObserver to detect new chat messages (optional)
  window.observeChatMessages = function(containerSelector, messageSelector, roleAttribute = 'data-role') {
    if (!initialized) {
      console.error('SmartRep Integration: Not initialized. Call initSmartRepIntegration first');
      return false;
    }
    
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error('SmartRep Integration: Chat container not found');
      return false;
    }
    
    const observer = new MutationObserver((mutations) => {
      window.autoDetectChatbotMessages(messageSelector, roleAttribute);
    });
    
    observer.observe(container, { 
      childList: true, 
      subtree: true 
    });
    
    console.log('SmartRep Integration: Now observing chat messages');
    return true;
  };

  // Expose the SmartRep integration as a global object
  window.SmartRepAI = {
    init: window.initSmartRepIntegration,
    sendMessage: window.sendMessageToSmartRep,
    listen: window.listenForSmartRepMessages,
    detectMessages: window.autoDetectChatbotMessages,
    observe: window.observeChatMessages
  };

  console.log('SmartRep AI Chatbot Integration loaded successfully');
})(); 
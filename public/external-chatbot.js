/**
 * SmartRep AI External Chatbot Integration
 * 
 * This script allows external chatbots to send messages to SmartRep AI.
 * Include this script in your external chatbot website.
 */

(function() {
  // Configuration
  let webhookUrl = '';
  let userEmail = '';
  let initialized = false;
  
  // Initialize the integration
  window.initSmartRepChatbot = function(endpoint, email) {
    webhookUrl = endpoint;
    userEmail = email;
    initialized = true;
    console.log('SmartRep chatbot integration initialized');
    return true;
  };
  
  // Function to send messages to SmartRep
  window.sendToSmartRep = async function(message, role = 'assistant') {
    if (!initialized) {
      console.error('SmartRep chatbot not initialized. Call initSmartRepChatbot first.');
      return false;
    }
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          message: message,
          role: role
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Message sent to SmartRep:', data);
      return data;
    } catch (error) {
      console.error('Failed to send message to SmartRep:', error);
      return false;
    }
  };
  
  // Function to automatically capture and send messages
  window.captureMessages = function(messageSelector, roleAttribute = 'data-role') {
    if (!initialized) {
      console.error('SmartRep chatbot not initialized. Call initSmartRepChatbot first.');
      return false;
    }
    
    // Find all message elements
    const messages = document.querySelectorAll(messageSelector);
    
    messages.forEach(element => {
      // Skip if already processed
      if (element.dataset.smartrepProcessed) return;
      
      // Get message content and role
      const message = element.textContent.trim();
      const role = element.getAttribute(roleAttribute) || 'assistant';
      
      // Send to SmartRep
      if (message) {
        window.sendToSmartRep(message, role);
        element.dataset.smartrepProcessed = 'true';
      }
    });
    
    return true;
  };
  
  // Set up a MutationObserver to watch for new chat messages
  window.watchChatMessages = function(containerSelector, messageSelector, roleAttribute = 'data-role') {
    if (!initialized) {
      console.error('SmartRep chatbot not initialized. Call initSmartRepChatbot first.');
      return false;
    }
    
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error('Chat container not found');
      return false;
    }
    
    // Create observer
    const observer = new MutationObserver(() => {
      window.captureMessages(messageSelector, roleAttribute);
    });
    
    // Start observing
    observer.observe(container, {
      childList: true,
      subtree: true
    });
    
    console.log('Now watching for chat messages');
    return true;
  };
  
  // Expose the API globally
  window.SmartRepChatbot = {
    init: window.initSmartRepChatbot,
    send: window.sendToSmartRep,
    capture: window.captureMessages,
    watch: window.watchChatMessages
  };
  
  console.log('SmartRep External Chatbot Integration loaded');
})(); 
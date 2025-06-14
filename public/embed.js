// SmartRep AI Embedded Chatbot
(function() {
  // Configuration
  const config = {
    baseUrl: window.location.origin, // Will be replaced with your actual domain in production
    iframeUrl: '/embedded-chatbot',
    buttonColor: '#0f172a', // Default color - can be customized
    buttonIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    title: 'SmartRep AI Chat',
    welcomeMessage: 'Hello! How can I help you today?'
  };

  // Create styles
  const styles = document.createElement('style');
  styles.innerHTML = `
    .smartrep-chat-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    
    .smartrep-chat-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: ${config.buttonColor};
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    
    .smartrep-chat-button:hover {
      transform: scale(1.05);
    }
    
    .smartrep-chat-container {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: none;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
    }
    
    .smartrep-chat-container.open {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
    
    .smartrep-chat-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    
    @media (max-width: 480px) {
      .smartrep-chat-container {
        width: 90vw;
        height: 70vh;
      }
    }
  `;
  document.head.appendChild(styles);

  // Create widget elements
  const widget = document.createElement('div');
  widget.className = 'smartrep-chat-widget';

  const chatButton = document.createElement('div');
  chatButton.className = 'smartrep-chat-button';
  chatButton.innerHTML = config.buttonIcon;
  chatButton.setAttribute('aria-label', 'Open chat');

  const chatContainer = document.createElement('div');
  chatContainer.className = 'smartrep-chat-container';

  const chatIframe = document.createElement('iframe');
  chatIframe.className = 'smartrep-chat-iframe';
  chatIframe.src = `${config.baseUrl}${config.iframeUrl}`;
  chatIframe.title = config.title;
  chatIframe.setAttribute('allow', 'microphone');

  // Assemble the widget
  chatContainer.appendChild(chatIframe);
  widget.appendChild(chatContainer);
  widget.appendChild(chatButton);
  document.body.appendChild(widget);

  // Toggle chat visibility
  let isChatOpen = false;
  chatButton.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      chatContainer.classList.add('open');
      chatButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
      
      // Initialize chat with user email if available
      if (window.smartRepUserEmail) {
        chatIframe.contentWindow.postMessage({
          type: 'INIT_CHAT',
          email: window.smartRepUserEmail
        }, config.baseUrl);
      }
    } else {
      chatContainer.classList.remove('open');
      chatButton.innerHTML = config.buttonIcon;
    }
  });

  // Listen for messages from the iframe
  window.addEventListener('message', (event) => {
    // Verify the origin
    if (event.origin !== config.baseUrl) return;

    if (event.data.type === 'CHAT_INITIALIZED') {
      console.log('Chat initialized for:', event.data.email);
    }
  });

  // Expose public API
  window.SmartRepChat = {
    open: () => {
      if (!isChatOpen) {
        chatButton.click();
      }
    },
    close: () => {
      if (isChatOpen) {
        chatButton.click();
      }
    },
    setUserEmail: (email) => {
      window.smartRepUserEmail = email;
      if (isChatOpen) {
        chatIframe.contentWindow.postMessage({
          type: 'INIT_CHAT',
          email: email
        }, config.baseUrl);
      }
    }
  };
})(); 
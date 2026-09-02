// SmartRep AI Embedded Chatbot
(function() {
  const scriptEl = document.currentScript;
  const configuredBase = scriptEl && scriptEl.getAttribute('data-base-url');
  const config = {
    baseUrl: configuredBase || (scriptEl && scriptEl.src ? new URL(scriptEl.src).origin : window.location.origin),
    iframeUrl: '/embedded-chatbot',
    buttonColor: '#2563eb',
    title: 'Chat with us'
  };

  const styles = document.createElement('style');
  styles.innerHTML = `
    .smartrep-chat-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
    }

    .smartrep-chat-button {
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 999px;
      background: linear-gradient(145deg, ${config.buttonColor}, #1d4ed8);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      box-shadow: 0 12px 28px rgba(37, 99, 235, 0.38), inset 0 1px 0 rgba(255,255,255,0.25);
      transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
    }

    .smartrep-chat-button::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 999px;
      border: 2px solid ${config.buttonColor};
      animation: smartrepGlow 2.2s ease-out infinite;
      pointer-events: none;
    }

    .smartrep-chat-button.open::after {
      animation: none;
      opacity: 0;
    }

    .smartrep-chat-button svg {
      transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
    }

    .smartrep-chat-button:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 16px 32px rgba(37, 99, 235, 0.48);
    }

    .smartrep-chat-button:active {
      transform: scale(0.92);
    }

    .smartrep-chat-container {
      position: absolute;
      bottom: 72px;
      right: 0;
      width: 380px;
      height: 560px;
      background: white;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.2);
      opacity: 0;
      pointer-events: none;
      transform: translateY(18px) scale(0.94);
      transform-origin: bottom right;
      filter: blur(6px);
      transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
    }

    .smartrep-chat-container.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }

    @keyframes smartrepGlow {
      0% { transform: scale(1); opacity: 0.4; }
      100% { transform: scale(1.45); opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .smartrep-chat-button, .smartrep-chat-container, .smartrep-chat-button svg {
        transition: none !important;
        animation: none !important;
      }
    }

    .smartrep-chat-iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: white;
    }

    @media (max-width: 480px) {
      .smartrep-chat-container {
        position: fixed;
        inset: 8px;
        width: auto;
        height: auto;
        border-radius: 12px;
      }
    }
  `;
  document.head.appendChild(styles);

  const widget = document.createElement('div');
  widget.className = 'smartrep-chat-widget';

  const chatButton = document.createElement('button');
  chatButton.className = 'smartrep-chat-button';
  chatButton.type = 'button';
  chatButton.setAttribute('aria-label', 'Open chat');
  const openIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
  chatButton.innerHTML = openIcon;

  const chatContainer = document.createElement('div');
  chatContainer.className = 'smartrep-chat-container';

  const chatIframe = document.createElement('iframe');
  chatIframe.className = 'smartrep-chat-iframe';
  chatIframe.src = `${config.baseUrl}${config.iframeUrl}`;
  chatIframe.title = config.title;
  chatIframe.setAttribute('allow', 'microphone');

  chatContainer.appendChild(chatIframe);
  widget.appendChild(chatContainer);
  widget.appendChild(chatButton);
  document.body.appendChild(widget);

  let isChatOpen = false;
  chatButton.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    chatContainer.classList.toggle('open', isChatOpen);
    chatButton.classList.toggle('open', isChatOpen);
    chatButton.innerHTML = isChatOpen ? closeIcon : openIcon;
    chatButton.setAttribute('aria-label', isChatOpen ? 'Close chat' : 'Open chat');

    if (isChatOpen && window.smartRepUserEmail) {
      chatIframe.contentWindow.postMessage({
        type: 'INIT_CHAT',
        email: window.smartRepUserEmail
      }, config.baseUrl);
    }
  });

  window.addEventListener('message', (event) => {
    if (event.origin !== config.baseUrl) return;
    if (event.data && event.data.type === 'CLOSE_CHAT' && isChatOpen) {
      chatButton.click();
    }
  });

  window.SmartRepChat = {
    open: () => { if (!isChatOpen) chatButton.click(); },
    close: () => { if (isChatOpen) chatButton.click(); },
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

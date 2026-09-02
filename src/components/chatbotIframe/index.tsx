"use client"
import React, { useEffect } from 'react';

const ChatbotIframe = () => {
  useEffect(() => {
    const existingIframe = document.querySelector('.chat-frame');
    if (existingIframe) return;

    const iframe = document.createElement("iframe");

    const iframeStyles = (styleString: string) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(`
      .chat-frame {
        position: fixed;
        bottom: 16px;
        right: 16px;
        border: none;
        z-index: 9999;
        width: 80px;
        height: 80px;
        max-width: min(400px, calc(100vw - 24px));
        max-height: min(680px, calc(100vh - 24px));
        border-radius: 20px;
        background: transparent;
      }
    `);

    iframe.src = "https://chatbot-jigsid.vercel.app/chatbot";
    iframe.classList.add('chat-frame');
    iframe.setAttribute('allow', 'microphone');
    document.body.appendChild(iframe);

    const handleMessage = (e: MessageEvent) => {
      if (e.origin.replace(/\/$/, '') !== "https://chatbot-jigsid.vercel.app") return;

      let payload = e.data;
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }
      if (!payload || typeof payload.width !== 'number' || typeof payload.height !== 'number') return;

      iframe.style.width = payload.width + 'px';
      iframe.style.height = payload.height + 'px';
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  return null;
};

export default ChatbotIframe;

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

    iframe.src = "/chatbot";
    iframe.classList.add('chat-frame');
    iframe.setAttribute('allow', 'microphone');
    document.body.appendChild(iframe);

    const applySize = (payload: { width?: number; height?: number }) => {
      if (typeof payload.width !== 'number' || typeof payload.height !== 'number') return;
      iframe.style.width = payload.width + 'px';
      iframe.style.height = payload.height + 'px';
    };

    const handleMessage = (e: MessageEvent) => {
      let payload = e.data;
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }
      applySize(payload);
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

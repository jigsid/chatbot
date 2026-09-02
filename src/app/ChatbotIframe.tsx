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
        width: 72px;
        height: 72px;
        max-width: min(400px, calc(100vw - 24px));
        max-height: min(640px, calc(100vh - 24px));
        border-radius: 16px;
        overflow: hidden;
        background: transparent;
      }
    `);

    iframe.src = "/chatbot";
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    const handleMessage = (e: MessageEvent) => {
      try {
        const dimensions = JSON.parse(e.data);
        iframe.style.width = dimensions.width + 'px';
        iframe.style.height = dimensions.height + 'px';
      } catch (error) {
        console.error('Invalid message data:', e.data);
      }
      iframe.contentWindow?.postMessage("408253b7-57fe-4f3d-a24b-6d401e246055", "*");
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
  
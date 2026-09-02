'use client'

import Section from '@/components/section-label'
import { useToast } from '@/components/ui/use-toast'
import { Copy } from 'lucide-react'
import React from 'react'

type Props = {
  id: string
}

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast()
  const appUrl = (process.env.NEXT_PUBLIC_URL || '').replace(/\/$/, '')
  const originUrl = (process.env.NEXT_PUBLIC_URL1 || appUrl).replace(/\/$/, '')

  const snippet = `
"use client"
import React, { useEffect } from 'react';

const ChatbotIframe = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");

    const iframeStyles = (styleString) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(\`
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
    \`);

    iframe.src = "${appUrl}/chatbot";
    iframe.classList.add('chat-frame');
    iframe.setAttribute('allow', 'microphone');
    document.body.appendChild(iframe);

    const allowed = ["${originUrl}", "${appUrl}"].filter(Boolean);
    let sentId = false;

    const sendBotId = () => {
      if (sentId || !iframe.contentWindow) return;
      sentId = true;
      iframe.contentWindow.postMessage("${id}", "*");
    };

    iframe.addEventListener('load', sendBotId);

    const handleMessage = (e) => {
      if (allowed.length && !allowed.includes(e.origin)) return;

      let payload = e.data;
      if (typeof payload === 'string') {
        try { payload = JSON.parse(payload); } catch { return; }
      }
      if (!payload || typeof payload.width !== 'number' || typeof payload.height !== 'number') return;

      iframe.style.width = payload.width + 'px';
      iframe.style.height = payload.height + 'px';
      sendBotId();
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
    };
  }, []);

  return null;
};

export default ChatbotIframe;
  `.trim()

  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <Section
        label="Code snippet"
        message="Copy and paste this code snippet into the header tag of your website"
      />
      <div className="bg-cream px-6 py-4 rounded-lg w-full relative">
        <Copy
          className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-700 z-10"
          onClick={() => {
            navigator.clipboard.writeText(snippet)
            toast({
              title: 'Copied to clipboard',
              description: 'You can now paste the code inside your website',
            })
          }}
        />
        <div className="max-h-[200px] overflow-y-auto pr-4 custom-scrollbar">
          <pre className="text-sm">
            <code className="text-gray-500 whitespace-pre-wrap break-all">{snippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default CodeSnippet

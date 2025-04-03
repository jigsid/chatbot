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

  const snippet = `
"use client"
import React, { useEffect } from 'react';

const ChatbotIframe = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");

    const iframeStyles = (styleString: string) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(\`
      .chat-frame {
        position: fixed;
        bottom: 20px;
        right: 20px;
        border: none;
        z-index: 999;
        max-width: 350px;
        max-height: 646px;
        border-radius: 10px;
      }
    \`);

    iframe.src = "${process.env.NEXT_PUBLIC_URL}chatbot";
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "${process.env.NEXT_PUBLIC_URL1}") return null;
      try {
        const dimensions = JSON.parse(e.data);
        iframe.style.width = dimensions.width + 'px';
        iframe.style.height = dimensions.height + 'px';
      } catch (error) {
        console.error('Invalid message data:', e.data);
      }
      iframe.contentWindow?.postMessage("${id}", "${process.env.NEXT_PUBLIC_URL}");
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      document.body.removeChild(iframe);
    };
  }, []);

  return null;
};

export default ChatbotIframe;
  `;

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

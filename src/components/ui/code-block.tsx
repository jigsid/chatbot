'use client'

import { Copy } from 'lucide-react'
import { Button } from './button'
import { useState } from 'react'

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="absolute right-2 top-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleCopy}
        >
          {copied ? (
            <span className="text-xs">Copied!</span>
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="mb-4 mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4">
        <code className={`language-${language} text-white text-sm`}>
          {code}
        </code>
      </pre>
    </div>
  )
} 
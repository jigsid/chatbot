'use client'

import { useEffect } from 'react'

export default function ChatbotThemeLock() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    document.documentElement.style.colorScheme = 'light'
  }, [])

  return null
}

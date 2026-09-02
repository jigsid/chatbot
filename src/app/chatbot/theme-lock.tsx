'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ChatbotThemeLock() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('light')
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    document.documentElement.style.colorScheme = 'light'
  }, [setTheme])

  return null
}

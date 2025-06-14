'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface VapiConfig {
  apiKey: string
  assistantId: string
}

interface VapiContextType {
  config: VapiConfig
  updateConfig: (newConfig: Partial<VapiConfig>) => void
}

const defaultConfig: VapiConfig = {
  apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY || '',
  assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ''
}

const VapiContext = createContext<VapiContextType | undefined>(undefined)

export const VapiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<VapiConfig>(defaultConfig)

  const updateConfig = (newConfig: Partial<VapiConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig
    }))
  }

  return (
    <VapiContext.Provider value={{ config, updateConfig }}>
      {children}
    </VapiContext.Provider>
  )
}

export const useVapi = (): VapiContextType => {
  const context = useContext(VapiContext)
  if (context === undefined) {
    throw new Error('useVapi must be used within a VapiProvider')
  }
  return context
} 
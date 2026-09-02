'use client'

import React from 'react'

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

type State = {
  hasError: boolean
}

export class WidgetErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Chat widget crashed:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

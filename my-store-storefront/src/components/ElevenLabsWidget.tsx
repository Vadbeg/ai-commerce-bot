'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initializeFunctionCalling, registerFunction } from '../../../frontend/src/services/functionCalling'
import { availableFunctions } from '../../../frontend/src/services/functions'
import { initializeElevenLabsIntegration } from '../../../frontend/src/services/elevenlabsIntegration'

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-id'?: string
        },
        HTMLElement
      >
    }
  }
}

export default function ElevenLabsWidget() {
  const pathname = usePathname()

  // Hide widget on account and admin pages (similar to frontend admin page behavior)
  const isAccountPage = pathname?.includes('/account')
  const isAdminPage = pathname?.includes('/admin')
  const shouldHideWidget = isAccountPage || isAdminPage

  useEffect(() => {
    // Initialize function calling for LLM integration
    initializeFunctionCalling()

    // Register all available functions
    availableFunctions.forEach(func => registerFunction(func))
    console.log('[ElevenLabs] Registered functions:', availableFunctions.length)

    // Initialize ElevenLabs widget integration
    initializeElevenLabsIntegration()
  }, [])

  // Don't render widget on account or admin pages
  if (shouldHideWidget) {
    console.log('[ElevenLabs] Widget hidden on:', pathname)
    return null
  }

  return (
    <elevenlabs-convai agent-id="agent_6701k7v7hw5hebfsyk6nm81nnh0g" />
  )
}

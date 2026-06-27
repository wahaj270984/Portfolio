import type { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

/**
 * Isolates WebGL / R3F failures so a crashing scene degrades to a plain
 * gradient backdrop instead of taking the whole DOM app down with it.
 */
export function CanvasErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-secondary to-background"
        />
      }
      onError={(error) => {
        if (import.meta.env.DEV) console.error('[SceneCanvas]', error)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

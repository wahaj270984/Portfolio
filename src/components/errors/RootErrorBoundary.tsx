import type { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './ErrorFallback'

/** Top-level boundary wrapping the whole app. */
export function RootErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // Hook for an error-reporting service (Sentry, etc.).
        if (import.meta.env.DEV) console.error(error, info)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

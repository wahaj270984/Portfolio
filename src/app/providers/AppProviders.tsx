import type { ReactNode } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { RootErrorBoundary } from '@/components/errors'
import { useReducedMotion } from '@/hooks'
import { ThemeProvider } from './ThemeProvider'

/**
 * Composes the app-wide context providers and global side-effect hooks in one
 * place, wrapped by the top-level error boundary.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  useReducedMotion()

  return (
    <RootErrorBoundary>
      <ThemeProvider>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </ThemeProvider>
    </RootErrorBoundary>
  )
}

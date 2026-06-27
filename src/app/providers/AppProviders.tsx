import type { ReactNode } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { RootErrorBoundary } from '@/components/errors'
import { useReducedMotion, useLenis, useActiveSection, useKonami } from '@/hooks'
import { ThemeProvider } from './ThemeProvider'

/**
 * Composes the app-wide context providers and global side-effect hooks in one
 * place, wrapped by the top-level error boundary.
 *
 * Global hooks live here so they run for the whole app lifetime:
 *  - `useReducedMotion` mirrors the OS preference into the experience store,
 *  - `useLenis` owns smooth scroll + publishes scroll progress,
 *  - `useActiveSection` tracks the centred section for the scrollspy + 3D world,
 *  - `useKonami` arms the hidden hyperdrive easter egg.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  useReducedMotion()
  useLenis()
  useActiveSection()
  useKonami()

  return (
    <RootErrorBoundary>
      <ThemeProvider>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </ThemeProvider>
    </RootErrorBoundary>
  )
}

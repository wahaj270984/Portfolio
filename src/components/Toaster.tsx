import { Toaster as Sonner } from 'sonner'
import { useTheme } from '@/store/useTheme'

/** App-wide toast surface, theme-synced to the active color scheme. */
export function Toaster() {
  const resolved = useTheme((s) => s.resolved)
  return (
    <Sonner
      theme={resolved}
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'rounded-lg border border-border bg-popover text-popover-foreground',
        },
      }}
    />
  )
}

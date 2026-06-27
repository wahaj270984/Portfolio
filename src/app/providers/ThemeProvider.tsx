import { useEffect, type ReactNode } from 'react'
import { useTheme, type ResolvedTheme } from '@/store/useTheme'

function systemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * Resolves the user's theme preference (`light` | `dark` | `system`) to a
 * concrete theme and writes it to `<html data-theme>`, where the CSS token
 * layer in globals.css reads it. Re-resolves when the OS theme changes while
 * the preference is `system`.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useTheme((s) => s.preference)
  const setResolved = useTheme((s) => s.setResolved)

  useEffect(() => {
    const apply = () => {
      const resolved = preference === 'system' ? systemTheme() : preference
      document.documentElement.dataset.theme = resolved
      document.documentElement.style.colorScheme = resolved
      setResolved(resolved)
    }

    apply()

    if (preference !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [preference, setResolved])

  return children
}
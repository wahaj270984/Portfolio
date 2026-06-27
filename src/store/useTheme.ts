import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeState {
  /** User preference (persisted). */
  preference: ThemePreference
  /** Actual theme applied to the DOM after resolving `system`. */
  resolved: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
  setResolved: (resolved: ResolvedTheme) => void
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'system',
      resolved: 'light',
      setPreference: (preference) => set({ preference }),
      setResolved: (resolved) => set({ resolved }),
    }),
    {
      name: 'theme',
      // Only the preference is persisted; `resolved` is derived at runtime.
      partialize: (state) => ({ preference: state.preference }),
    },
  ),
)
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme, type ThemePreference } from '@/store/useTheme'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const ORDER: ThemePreference[] = ['light', 'dark', 'system']
const ICON = { light: Sun, dark: Moon, system: Monitor } as const
const LABEL = { light: 'Light', dark: 'Dark', system: 'System' } as const

/** Cycles theme preference: light → dark → system. */
export function ThemeToggle() {
  const preference = useTheme((s) => s.preference)
  const setPreference = useTheme((s) => s.setPreference)
  const Icon = ICON[preference]

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length]
    setPreference(next)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={cycle}
          aria-label={`Theme: ${LABEL[preference]}. Click to change.`}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Theme: {LABEL[preference]}</TooltipContent>
    </Tooltip>
  )
}

import { navigation } from '@/config/navigation'
import { useExperience } from '@/store/useExperience'
import { scrollToSection } from '@/hooks'
import { cn } from '@/lib/utils'

/**
 * Vertical dot rail on the right edge — one dot per section, the active one
 * elongated. Click to fly there. Hidden on small screens where it would crowd.
 */
export function SectionIndicator() {
  const activeSection = useExperience((s) => s.activeSection)

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {navigation.map((item) => {
        const active = activeSection === item.id
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group relative flex items-center"
            aria-label={`Go to ${item.label}`}
            aria-current={active ? 'true' : undefined}
          >
            <span
              className={cn(
                'block w-1.5 rounded-full transition-all duration-300',
                active
                  ? 'h-6 bg-primary shadow-[0_0_12px_var(--color-primary)]'
                  : 'h-1.5 bg-muted-foreground/40 group-hover:bg-muted-foreground',
              )}
            />
            <span className="pointer-events-none absolute right-5 whitespace-nowrap rounded-md glass px-2 py-1 font-mono text-[10px] uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

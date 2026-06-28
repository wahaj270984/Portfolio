import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navigation } from '@/config/navigation'
import { site } from '@/config/site'
import { useExperience } from '@/store/useExperience'
import { scrollToSection, scrollToTop } from '@/hooks'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Fixed glass navbar with scrollspy active state. Condenses once the page is
 * scrolled. On small screens the links collapse into a full-screen overlay menu.
 */
export function Navbar() {
  const activeSection = useExperience((s) => s.activeSection)
  const progress = useExperience((s) => s.scrollProgress)
  const [open, setOpen] = useState(false)
  const scrolled = progress > 0.01

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500',
          scrolled ? 'py-2' : 'py-4',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 md:px-6',
            scrolled ? 'glass-strong h-12 shadow-lg shadow-black/20' : 'h-14 bg-transparent',
          )}
        >
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-heading text-sm font-bold tracking-tight"
            aria-label="Back to top"
          >
            <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-primary to-accent text-xs text-primary-foreground shadow-[0_0_18px_-2px_var(--color-primary)]">
              W
            </span>
            <span className="hidden sm:block">{site.shortName}</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navigation.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                  aria-current={active ? 'true' : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-secondary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="hidden rounded-full sm:inline-flex"
            >
              <a href={site.resumeUrl} download="Muhammad-Wahaj-Khan-Resume.pdf">
                Résumé
              </a>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 glass-strong md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navigation.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => go(item.id)}
                className="font-heading text-2xl font-semibold text-foreground/90"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.04 * i } }}
                exit={{ opacity: 0 }}
              >
                <span className="mr-2 font-mono text-xs text-primary">{item.index}</span>
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

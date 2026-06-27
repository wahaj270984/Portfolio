import { useEffect } from 'react'
import Lenis from 'lenis'
import { useExperience } from '@/store/useExperience'

/**
 * Module-level handle so non-React callers (nav links, the section indicator)
 * can drive smooth scrolling without prop-drilling a ref.
 */
let lenis: Lenis | null = null

/** Smooth-scroll to a section by id, falling back to native when Lenis is off. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Owns smooth scrolling and publishes normalized scroll progress (0..1) into the
 * experience store, which the camera rig + DOM chrome read. Under reduced motion
 * Lenis is never created — native scroll drives the same progress value, so the
 * rest of the app is agnostic to which path is active.
 */
export function useLenis() {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const setScrollProgress = useExperience((s) => s.setScrollProgress)

  useEffect(() => {
    if (reducedMotion) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(max > 0 ? window.scrollY / max : 0)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenis = instance
    document.documentElement.classList.add('lenis')

    instance.on('scroll', ({ progress }: { progress: number }) => {
      setScrollProgress(Number.isFinite(progress) ? progress : 0)
    })

    let raf = 0
    const loop = (time: number) => {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      document.documentElement.classList.remove('lenis')
      lenis = null
    }
  }, [reducedMotion, setScrollProgress])
}

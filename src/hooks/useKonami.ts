import { useEffect } from 'react'
import { toast } from 'sonner'
import { useExperience } from '@/store/useExperience'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

/**
 * Listens for the Konami code and toggles "hyperdrive" — a hidden 3D-world
 * intensifier — with a toast. A classic, harmless easter egg.
 */
export function useKonami() {
  const toggleHyperdrive = useExperience((s) => s.toggleHyperdrive)

  useEffect(() => {
    let index = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === SEQUENCE[index]) {
        index += 1
        if (index === SEQUENCE.length) {
          index = 0
          toggleHyperdrive()
          const { hyperdrive } = useExperience.getState()
          toast(hyperdrive ? '⚡ Hyperdrive engaged' : 'Hyperdrive disengaged', {
            description: hyperdrive ? 'The universe just got louder.' : 'Back to cruising speed.',
          })
        }
      } else {
        index = key === SEQUENCE[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleHyperdrive])
}

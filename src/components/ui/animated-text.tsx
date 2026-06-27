import { useEffect, useState } from 'react'
import { useExperience } from '@/store/useExperience'
import { cn } from '@/lib/utils'

interface TypeCycleProps {
  words: readonly string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  holdMs?: number
}

/**
 * Typewriter that cycles through `words` with a blinking caret. Under reduced
 * motion it simply shows the first word with a steady caret (no animation).
 */
export function TypeCycle({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 35,
  holdMs = 1600,
}: TypeCycleProps) {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const current = words[index % words.length]

    if (!deleting && text === current) {
      const id = window.setTimeout(() => setDeleting(true), holdMs)
      return () => window.clearTimeout(id)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const id = window.setTimeout(
      () => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? deleteSpeed : typeSpeed,
    )
    return () => window.clearTimeout(id)
  }, [text, deleting, index, words, reducedMotion, typeSpeed, deleteSpeed, holdMs])

  const display = reducedMotion ? words[0] : text

  return (
    <span className={cn('inline-flex items-center', className)} aria-live="polite">
      <span>{display}</span>
      <span
        className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.08em] bg-primary motion-safe:animate-pulse"
        aria-hidden
      />
    </span>
  )
}

interface WordsRevealProps {
  text: string
  className?: string
  wordClassName?: string
}

/**
 * Splits a string into words and reveals them in a staggered rise. Used for the
 * hero headline. Reduced motion renders the words statically.
 */
export function WordsReveal({ text, className, wordClassName }: WordsRevealProps) {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className={cn('inline-block', wordClassName)}
            style={
              reducedMotion
                ? undefined
                : {
                    animation: 'reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) both',
                    animationDelay: `${0.08 * i}s`,
                  }
            }
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </span>
  )
}

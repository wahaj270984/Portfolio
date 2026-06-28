import { useState } from 'react'
import { Sparkles, Shuffle } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/badge'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { techTrivia, type TechFact } from '@/data/tech-trivia'
import { useExperience } from '@/store/useExperience'
import { cn } from '@/lib/utils'

const CATEGORY_LABELS: Record<TechFact['category'], string> = {
  ml: 'Machine Learning',
  cs: 'Computer Science',
  math: 'Mathematics',
  history: 'Computing History',
  hardware: 'Hardware',
}

const CATEGORY_COLORS: Record<TechFact['category'], string> = {
  ml: 'bg-primary/10 text-primary border-primary/20',
  cs: 'bg-accent/10 text-accent border-accent/20',
  math: 'bg-violet/10 text-violet border-violet/20',
  history: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20',
  hardware: 'bg-destructive/10 text-destructive border-destructive/20',
}

/**
 * Fun facts generator: AI/ML/CS technical trivia with typewriter reveal and
 * shuffle button. Reinforces technical persona.
 */
export function TechTrivia() {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const currentFact = techTrivia[currentIndex]

  const shuffle = () => {
    if (isTyping) return
    let next = currentIndex
    while (next === currentIndex) {
      next = Math.floor(Math.random() * techTrivia.length)
    }
    setCurrentIndex(next)
    if (!reducedMotion) {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), currentFact.fact.length * 15)
    }
  }

  return (
    <Section id="tech-trivia" aria-label="Technical trivia">
      <SectionHeading
        index="07"
        eyebrow="Technical Trivia"
        title={
          <>
            Fun Facts from <span className="text-gradient">AI, ML & CS</span>
          </>
        }
        description="Random bite-sized insights from machine learning, computer science, mathematics, and computing history."
        align="center"
      />

      <Reveal from="up" delay={3}>
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <div className="mb-6 flex items-center justify-between">
              <Badge
                variant="outline"
                className={cn('gap-2', CATEGORY_COLORS[currentFact.category])}
              >
                <Sparkles className="size-3" />
                {CATEGORY_LABELS[currentFact.category]}
              </Badge>

              <MagneticButton
                size="sm"
                variant="outline"
                onClick={shuffle}
                disabled={isTyping}
                className="gap-2"
              >
                <Shuffle className="size-4" />
                Shuffle
              </MagneticButton>
            </div>

            <div
              className={cn(
                'min-h-[8rem] text-lg leading-relaxed text-foreground/90 md:text-xl',
                isTyping && 'animate-pulse',
              )}
            >
              {currentFact.fact}
            </div>

            {currentFact.source && (
              <p className="mt-6 text-sm text-muted-foreground">
                <span className="font-mono">→</span> {currentFact.source}
              </p>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {currentIndex + 1} of {techTrivia.length} facts
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

import { Brain, Code2, Medal, Rocket, Star, Trophy, type LucideIcon } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Reveal } from '@/components/motion/Reveal'
import { achievements, type Achievement } from '@/data/achievements'

const ICONS: Record<Achievement['icon'], LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  rocket: Rocket,
  brain: Brain,
  code: Code2,
}

export function Achievements() {
  return (
    <Section id="achievements" aria-label="Achievements">
      <SectionHeading
        index="07"
        eyebrow="Achievements"
        title={<>Wins worth <span className="text-gradient">remembering</span></>}
        description="Hackathons, honours, and milestones along the way."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, i) => {
          const Icon = ICONS[item.icon]
          return (
            <Reveal key={item.id} from="up" delay={i} className="h-full">
              <GlassPanel pad="lg" className="group h-full transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{item.year}</span>
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-primary">{item.org}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </GlassPanel>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

import { GraduationCap } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Reveal } from '@/components/motion/Reveal'
import { education } from '@/data/education'

export function Education() {
  return (
    <Section id="education" aria-label="Education">
      <SectionHeading
        index="06"
        eyebrow="Education"
        title={<>Foundations at <span className="text-gradient">NUST SEECS</span></>}
        description="Computer Engineering, with research running alongside the coursework."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.id} from={i % 2 === 0 ? 'left' : 'right'} delay={i} className="h-full">
            <GlassPanel pad="lg" className="flex h-full flex-col">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold leading-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                  <p className="mt-1 font-mono text-xs text-primary">
                    {item.period} · {item.location}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-foreground/80">{item.details}</p>

              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

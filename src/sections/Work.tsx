import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion/Reveal'
import { experience } from '@/data/experience'

/**
 * Work / experience section: professional experience rendered as a glowing
 * vertical timeline, newest first.
 */
export function Work() {
  return (
    <Section id="work" aria-label="Work experience">
      <SectionHeading
        index="04"
        eyebrow="Work"
        title={
          <>
            Where I've <span className="text-gradient">put it into practice</span>
          </>
        }
        description="Hands-on experience applying machine learning and engineering fundamentals."
      />

      <div className="mt-14">
        <div className="relative pl-8 md:pl-10">
          {/* Timeline track */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-[11px]" />

          <div className="space-y-8">
            {experience.map((item, i) => (
              <Reveal key={item.id} from="left" delay={i}>
                <div className="relative">
                  <span className="absolute -left-8 top-1.5 grid size-4 place-items-center md:-left-10">
                    <span className="absolute size-4 animate-ping rounded-full bg-primary/40" />
                    <span className="relative size-3 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
                  </span>

                  <GlassPanel pad="lg">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-heading text-lg font-semibold">{item.role}</h3>
                      <span className="font-mono text-xs text-primary">{item.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.org} · {item.location}
                    </p>
                    <p className="mt-3 text-sm text-foreground/80">{item.summary}</p>

                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {item.achievements.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </GlassPanel>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

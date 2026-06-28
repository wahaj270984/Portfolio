import { ArrowUpRight, Briefcase, Quote, Sparkles } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion/Reveal'
import { Tabs } from '@/components/ui/tabs'
import { experience } from '@/data/experience'
import { research, type Publication } from '@/data/research'

const STATUS: Record<Publication['status'], 'default' | 'accent' | 'violet'> = {
  Published: 'accent',
  'Under Review': 'default',
  'In Progress': 'violet',
}

/**
 * Unified Work & Research section: professional experience timeline + research
 * publications in a tabbed layout. For ML engineers where the two often overlap.
 */
export function WorkResearch() {
  return (
    <Section id="work-research" aria-label="Work and Research">
      <SectionHeading
        index="04"
        eyebrow="Work & Research"
        title={
          <>
            Shipping product &{' '}
            <span className="text-gradient">pushing on open problems</span>
          </>
        }
        description="Professional experience and research work — from production systems to lab bench experiments."
      />

      <div className="mt-14">
        <Tabs defaultValue="experience">
          <Tabs.List className="grid w-full grid-cols-2">
            <Tabs.Trigger value="experience" className="gap-2">
              <Briefcase className="size-4" />
              Experience
            </Tabs.Trigger>
            <Tabs.Trigger value="research" className="gap-2">
              <Sparkles className="size-4" />
              Research
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="experience" className="mt-8">
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
                          <h3 className="font-heading text-lg font-semibold">
                            {item.role}
                          </h3>
                          <span className="font-mono text-xs text-primary">
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.org} · {item.location}
                        </p>
                        <p className="mt-3 text-sm text-foreground/80">
                          {item.summary}
                        </p>

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
          </Tabs.Content>

          <Tabs.Content value="research" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {research.map((pub, i) => (
                <Reveal key={pub.id} from="up" delay={i} className="h-full">
                  <GlassPanel
                    pad="lg"
                    className="flex h-full flex-col"
                    glow={i === 0 ? 'primary' : 'none'}
                  >
                    <div className="flex items-center justify-between">
                      <Quote className="size-5 text-primary/60" aria-hidden />
                      <Badge variant={STATUS[pub.status]}>{pub.status}</Badge>
                    </div>
                    <h3 className="mt-4 font-heading text-base font-semibold leading-snug">
                      {pub.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {pub.authors} · {pub.venue}, {pub.year}
                    </p>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">
                      {pub.abstract}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {pub.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Read paper <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </GlassPanel>
                </Reveal>
              ))}
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </Section>
  )
}

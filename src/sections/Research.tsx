import { ArrowUpRight, Quote } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion/Reveal'
import { research, type Publication } from '@/data/research'

const STATUS: Record<Publication['status'], 'default' | 'accent' | 'violet'> = {
  Published: 'accent',
  'Under Review': 'default',
  'In Progress': 'violet',
}

export function Research() {
  return (
    <Section id="research" aria-label="Research">
      <SectionHeading
        index="05"
        eyebrow="Research"
        title={<>Pushing on <span className="text-gradient">open problems</span></>}
        description="Work at the lab bench — tracking, edge efficiency, and generative interfaces. The 3D graph behind this section mirrors the networks I train."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {research.map((pub, i) => (
          <Reveal key={pub.id} from="up" delay={i} className="h-full">
            <GlassPanel pad="lg" className="flex h-full flex-col" glow={i === 0 ? 'primary' : 'none'}>
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
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{pub.abstract}</p>

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
    </Section>
  )
}

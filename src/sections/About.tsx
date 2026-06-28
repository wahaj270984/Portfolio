import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { TiltCard } from '@/components/ui/tilt-card'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion/Reveal'
import { useCountUp } from '@/hooks'
import { profile, type Stat } from '@/data/profile'

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { value, ref } = useCountUp(stat.value)
  return (
    <Reveal from="up" delay={index} className="h-full">
      <TiltCard className="group h-full" max={9}>
        <GlassPanel pad="md" className="h-full text-center">
          <div className="font-heading text-3xl font-bold text-gradient md:text-4xl">
            <span ref={ref}>
              {stat.prefix}
              {value}
              {stat.suffix}
            </span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            {stat.label}
          </div>
        </GlassPanel>
      </TiltCard>
    </Reveal>
  )
}

export function About() {
  return (
    <Section id="about" aria-label="About me">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={<span className="text-gradient">Research-grade rigor, product-grade polish</span>}
        description={profile.summary}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal from="left">
          <GlassPanel pad="lg" glow="primary" className="h-full">
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              {profile.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {profile.interests.map((interest, i) => (
                <Badge
                  key={interest}
                  variant={i % 3 === 0 ? 'default' : i % 3 === 1 ? 'accent' : 'violet'}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </GlassPanel>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {profile.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

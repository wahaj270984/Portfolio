import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassPanel } from '@/components/ui/glass-panel'
import { TiltCard } from '@/components/ui/tilt-card'
import { Reveal } from '@/components/motion/Reveal'
import { useExperience } from '@/store/useExperience'
import { skillGroups, type Skill, type SkillGroup } from '@/data/skills'
import { cn } from '@/lib/utils'

const ACCENT: Record<SkillGroup['accent'], string> = {
  primary: 'border-primary/30 bg-primary/10 text-primary shadow-[0_0_24px_-8px_var(--color-primary)]',
  accent: 'border-accent/30 bg-accent/10 text-accent shadow-[0_0_24px_-8px_var(--color-accent)]',
  violet: 'border-violet/30 bg-violet/10 text-violet shadow-[0_0_24px_-8px_var(--color-violet)]',
}

function Orb({ skill, accent, i }: { skill: Skill; accent: SkillGroup['accent']; i: number }) {
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const size = 58 + skill.level * 46
  return (
    <motion.div
      className={cn(
        'group/orb grid shrink-0 place-items-center rounded-full border text-center backdrop-blur transition-transform duration-300 hover:scale-110',
        ACCENT[accent],
      )}
      style={{ width: size, height: size }}
      data-cursor="hover"
      animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
    >
      <span className="px-1 text-[11px] font-medium leading-tight">{skill.name}</span>
    </motion.div>
  )
}

export function Skills() {
  return (
    <Section id="skills" aria-label="Skills">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title={<>A stack that spans <span className="text-gradient">research to runtime</span></>}
        description="No progress bars — just the tools I reach for, clustered by domain. Orb size reflects depth."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.id} from={gi % 2 === 0 ? 'left' : 'right'} delay={gi} className="h-full">
            <TiltCard className="group h-full" max={5}>
            <GlassPanel pad="lg" className="h-full">
              <div className="mb-5 flex items-center gap-2">
                <span
                  className={cn(
                    'size-2.5 rounded-full',
                    group.accent === 'primary' && 'bg-primary',
                    group.accent === 'accent' && 'bg-accent',
                    group.accent === 'violet' && 'bg-violet',
                  )}
                />
                <h3 className="font-heading text-lg font-semibold">{group.label}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {group.skills.map((skill, i) => (
                  <Orb key={skill.name} skill={skill} accent={group.accent} i={i} />
                ))}
              </div>
            </GlassPanel>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/**
 * Skills grouped by domain. `level` (0..1) drives orb size / glow in both the
 * DOM constellation and the 3D `SkillField`. Keep groups small and visual.
 */
export interface Skill {
  name: string
  level: number
}

export interface SkillGroup {
  id: string
  label: string
  /** Accent token used for this cluster: 'primary' | 'accent' | 'violet'. */
  accent: 'primary' | 'accent' | 'violet'
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'ml',
    label: 'AI / Machine Learning',
    accent: 'primary',
    skills: [
      { name: 'PyTorch', level: 0.95 },
      { name: 'TensorFlow', level: 0.85 },
      { name: 'OpenCV', level: 0.9 },
      { name: 'Deep Learning', level: 0.92 },
      { name: 'Computer Vision', level: 0.95 },
      { name: 'Generative AI', level: 0.8 },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    accent: 'accent',
    skills: [
      { name: 'Python', level: 0.95 },
      { name: 'C++', level: 0.85 },
      { name: 'TypeScript', level: 0.88 },
      { name: 'JavaScript', level: 0.9 },
    ],
  },
  {
    id: 'web',
    label: 'Full-Stack',
    accent: 'violet',
    skills: [
      { name: 'React', level: 0.92 },
      { name: 'Next.js', level: 0.85 },
      { name: 'Node.js', level: 0.82 },
      { name: 'MongoDB', level: 0.75 },
      { name: 'Tailwind', level: 0.9 },
      { name: 'Three.js', level: 0.8 },
    ],
  },
  {
    id: 'tools',
    label: 'Systems & Tools',
    accent: 'primary',
    skills: [
      { name: 'Git', level: 0.9 },
      { name: 'Linux', level: 0.85 },
      { name: 'Docker', level: 0.78 },
      { name: 'Embedded', level: 0.7 },
    ],
  },
]

/** Flat list (used by the 3D skill field). */
export const allSkills: Skill[] = skillGroups.flatMap((g) => g.skills)

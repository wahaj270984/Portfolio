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
    label: 'Machine Learning',
    accent: 'primary',
    skills: [
      { name: 'Machine Learning', level: 0.85 },
      { name: 'Supervised Learning', level: 0.85 },
      { name: 'Scikit-learn', level: 0.8 },
      { name: 'NumPy', level: 0.85 },
      { name: 'Pandas', level: 0.8 },
      { name: 'Matplotlib', level: 0.75 },
    ],
  },
  {
    id: 'languages',
    label: 'Programming',
    accent: 'accent',
    skills: [
      { name: 'Python', level: 0.9 },
      { name: 'C / C++', level: 0.8 },
      { name: 'Verilog HDL', level: 0.78 },
    ],
  },
  {
    id: 'hardware',
    label: 'Hardware & Digital Logic',
    accent: 'violet',
    skills: [
      { name: 'Digital Logic Design', level: 0.85 },
      { name: 'Proteus', level: 0.8 },
      { name: 'ModelSim', level: 0.78 },
      { name: 'Arduino', level: 0.6 },
    ],
  },
  {
    id: 'data',
    label: 'Data & Software',
    accent: 'primary',
    skills: [
      { name: 'MySQL', level: 0.75 },
      { name: 'Data Analysis', level: 0.72 },
      { name: 'Backend Systems', level: 0.7 },
    ],
  },
]

/** Flat list (used by the 3D skill field). */
export const allSkills: Skill[] = skillGroups.flatMap((g) => g.skills)

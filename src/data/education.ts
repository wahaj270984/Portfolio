/** Education history. Renders as glass timeline cards. */
export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
  location: string
  details: string
  highlights: string[]
}

export const education: EducationItem[] = [
  {
    id: 'nust',
    degree: 'BS Computer Engineering',
    institution: 'NUST — School of Electrical Engineering & Computer Science (SEECS)',
    period: '2025 — 2029 (expected)',
    location: 'H-12, Islamabad, Pakistan',
    details:
      'Computer Engineering with a focus on machine learning, programming, and digital systems.',
    highlights: [
      '3.42 GPA',
      'Coursework: Programming Fundamentals, OOP, Digital Logic Design',
      'Calculus & Linear Algebra',
    ],
  },
  {
    id: 'fsc',
    degree: 'FSc Pre-Engineering',
    institution: 'Govt Degree Science & Commerce College, Malir Cantt',
    period: '2023 — 2025',
    location: 'Karachi, Pakistan',
    details:
      'Pre-Engineering foundation in mathematics, physics, and chemistry.',
    highlights: ['81% Grade'],
  },
]

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
    degree: 'BE Computer Engineering',
    institution: 'NUST — School of Electrical Engineering & Computer Science (SEECS)',
    period: '2022 — 2026',
    location: 'Islamabad, Pakistan',
    details:
      'Specialising in machine learning, computer vision, and embedded systems, with research alongside coursework.',
    highlights: [
      "Dean's List for academic excellence",
      'Research assistant in the vision lab',
      'Coursework: Deep Learning, Computer Architecture, Algorithms, DSP',
    ],
  },
  {
    id: 'preeng',
    degree: 'Pre-Engineering (FSc)',
    institution: 'Higher Secondary',
    period: '2020 — 2022',
    location: 'Pakistan',
    details:
      'Mathematics, Physics, and Computer Science foundation with top-tier results.',
    highlights: ['Distinction in Mathematics & Physics'],
  },
]

/** Professional / research experience, newest first. Renders as a 3D timeline. */
export interface ExperienceItem {
  id: string
  role: string
  org: string
  period: string
  location: string
  summary: string
  achievements: string[]
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'ml-research',
    role: 'Independent Machine Learning Research',
    org: 'NUST — under Dr. Ahmed Naeem',
    period: 'May 2026 — June 2026',
    location: 'Islamabad, Pakistan',
    summary:
      'Independent supervised-learning research exploring core machine-learning concepts and their practical implementation in Python.',
    achievements: [
      'Worked on supervised machine-learning concepts including regression and classification',
      'Studied model evaluation, overfitting, and the training workflow using Python',
      'Applied statistical learning and probabilistic modeling toward modern AI techniques',
    ],
    tags: ['Machine Learning', 'Python', 'Supervised Learning'],
  },
]

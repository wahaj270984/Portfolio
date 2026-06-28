/** Certifications. Renders as floating glass panels with an animated shine. */
export interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  credentialId?: string
  accent: 'primary' | 'accent' | 'violet'
}

export const certifications: Certification[] = [
  {
    id: 'google-ai',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    year: '2025',
    accent: 'primary',
  },
  {
    id: 'supervised-ml',
    title: 'Supervised Machine Learning: Regression & Classification',
    issuer: 'DeepLearning.AI',
    year: '2025',
    accent: 'accent',
  },
  {
    id: 'google-data',
    title: 'Google Data Analytics (Python)',
    issuer: 'Google',
    year: '2025',
    accent: 'violet',
  },
]

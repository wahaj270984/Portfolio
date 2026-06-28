/** Certifications. Renders as floating glass panels with an animated shine. */
export interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  credentialId?: string
  /** Public verification URL (e.g. a Coursera accomplishment link). */
  credentialUrl?: string
  accent: 'primary' | 'accent' | 'violet'
}

export const certifications: Certification[] = [
  {
    id: 'google-ai',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    year: '2025',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/specialization/D9XHO0WT7J7Y',
    accent: 'primary',
  },
  {
    id: 'supervised-ml',
    title: 'Supervised Machine Learning: Regression & Classification',
    issuer: 'DeepLearning.AI',
    year: '2025',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/XNYFL3LOGVM7',
    accent: 'accent',
  },
  {
    id: 'google-data',
    title: 'Google Data Analytics (Python)',
    issuer: 'Google',
    year: '2025',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/specialization/L97U0AP5UN2O',
    accent: 'violet',
  },
]

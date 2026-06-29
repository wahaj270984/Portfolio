import type { BrandKey } from '@/components/ui/brand-logo'

/** Certifications. Renders as floating glass panels with an animated shine. */
export interface Certification {
  id: string
  title: string
  issuer: string
  /** Brand mark of the issuing company/university shown on the card. */
  logo: BrandKey
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
    logo: 'google',
    year: '2025',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/specialization/D9XHO0WT7J7Y',
    accent: 'primary',
  },
  {
    id: 'supervised-ml',
    title: 'Supervised Machine Learning: Regression & Classification',
    issuer: 'DeepLearning.AI',
    logo: 'deeplearning-ai',
    year: '2025',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/XNYFL3LOGVM7',
    accent: 'accent',
  },
  {
    id: 'google-data',
    title: 'Google Data Analytics (Python)',
    issuer: 'Google',
    logo: 'google',
    year: '2025',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/specialization/L97U0AP5UN2O',
    accent: 'violet',
  },
  {
    id: 'bash-scripting',
    title: 'Mastering Bash Shell Scripting',
    issuer: 'Udemy',
    logo: 'udemy',
    year: '2025',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-6e13004c-e8f5-4a53-a0cb-ca35e595bc23/',
    accent: 'primary',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst: Professional Certificate in Data Analysis',
    issuer: 'Udemy',
    logo: 'udemy',
    year: '2025',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-41a3f17f-4af5-4604-ab64-775a257da6ac/',
    accent: 'accent',
  },
]

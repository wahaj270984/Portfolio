/** Certifications. Renders as floating glass panels with an animated shine. */
export interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  credentialId: string
  accent: 'primary' | 'accent' | 'violet'
}

export const certifications: Certification[] = [
  {
    id: 'dl-spec',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    year: '2024',
    credentialId: 'DLAI-7F3K9',
    accent: 'primary',
  },
  {
    id: 'tf-dev',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    year: '2024',
    credentialId: 'TF-DEV-2231',
    accent: 'accent',
  },
  {
    id: 'cv-nano',
    title: 'Computer Vision Nanodegree',
    issuer: 'Udacity',
    year: '2023',
    credentialId: 'UDA-CV-8810',
    accent: 'violet',
  },
  {
    id: 'mlops',
    title: 'Machine Learning Engineering for Production (MLOps)',
    issuer: 'DeepLearning.AI',
    year: '2025',
    credentialId: 'DLAI-MLOPS-44',
    accent: 'primary',
  },
  {
    id: 'aws-ml',
    title: 'AWS Certified Machine Learning',
    issuer: 'Amazon Web Services',
    year: '2025',
    credentialId: 'AWS-ML-19273',
    accent: 'accent',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    issuer: 'Meta',
    year: '2023',
    credentialId: 'META-FS-5521',
    accent: 'violet',
  },
]

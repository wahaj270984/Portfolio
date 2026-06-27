/** Single source of truth for site-level metadata + identity. */
export const site = {
  name: 'Muhammad Wahaj Khan',
  shortName: 'Wahaj Khan',
  title: 'Muhammad Wahaj Khan — ML Engineer & AI Researcher',
  description:
    'Immersive 3D portfolio of Muhammad Wahaj Khan — Machine Learning Engineer, AI Researcher, Computer Engineering student at NUST SEECS, and Full-Stack Developer specialising in computer vision and deep learning.',
  url: 'https://wahajkhan.dev',
  locale: 'en_US',
  author: 'Muhammad Wahaj Khan',
  /** Animated rotating roles on the hero. */
  roles: [
    'Machine Learning Engineer',
    'AI Researcher',
    'Computer Engineering Student',
    'Full-Stack Developer',
  ],
  email: 'wahaj.khan@example.com',
  location: 'Islamabad, Pakistan',
  resumeUrl: '/resume.pdf',
  links: {
    github: 'https://github.com/wahajkhan',
    linkedin: 'https://linkedin.com/in/wahajkhan',
    twitter: 'https://x.com/wahajkhan',
    email: 'mailto:wahaj.khan@example.com',
    scholar: 'https://scholar.google.com/',
  },
} as const

export type Site = typeof site

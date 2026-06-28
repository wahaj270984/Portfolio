/** Single source of truth for site-level metadata + identity. */
export const site = {
  name: 'Muhammad Wahaj Khan',
  shortName: 'Wahaj Khan',
  title: 'Wahaj Khan — Computer Engineering Student & ML Enthusiast',
  description:
    'Portfolio of Wahaj Khan — Computer Engineering student at NUST with a foundation in machine learning, Python, and digital systems.',
  url: 'https://wahajkhan.dev',
  locale: 'en_US',
  author: 'Wahaj Khan',
  /** Animated rotating roles on the hero. */
  roles: [
    'Computer Engineering Student',
    'Machine Learning Enthusiast',
    'Python Developer',
    'Digital Systems Designer',
  ],
  email: 'wahajk270984@gmail.com',
  location: 'Karachi, Pakistan',
  resumeUrl: '/resume.pdf',
  links: {
    github: 'https://github.com/wahaj270984',
    linkedin: 'https://www.linkedin.com/in/hafiz-muhammad-wahaj-khan/',
    email: 'mailto:wahajk270984@gmail.com',
  },
} as const

export type Site = typeof site

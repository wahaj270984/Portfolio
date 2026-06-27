/** Single source of truth for site-level metadata. */
export const site = {
  name: 'Immersive Portfolio',
  title: 'Immersive Portfolio',
  description: 'An immersive, scroll-driven 3D portfolio experience.',
  url: 'https://example.com',
  author: 'Your Name',
  links: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    email: 'mailto:hello@example.com',
  },
} as const

export type Site = typeof site

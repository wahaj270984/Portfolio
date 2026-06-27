/**
 * In-page section anchors. The portfolio is a single scroll-driven page; each
 * entry maps a nav label to a section `id`. Sections themselves are added in a
 * later phase — this is the contract they register against.
 */
export interface NavItem {
  id: string
  label: string
}

export const navigation: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

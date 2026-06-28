/**
 * In-page section anchors. The portfolio is a single scroll-driven page; each
 * entry maps a nav label to a section `id`. The camera rig keys its waypoints
 * off this same ordering (one cinematic stop per section), and the navbar +
 * scrollspy + section indicator all read from this list — it is the contract.
 */
export interface NavItem {
  id: string
  label: string
  /** Short index label shown in the side rail. */
  index: string
}

// NOTE: every `id` must match a real section id rendered on the page (see
// src/sections/*). The scrollspy resolves these via getElementById, so a stale
// id silently drops the link from both navigation and active-section tracking.
export const navigation: NavItem[] = [
  { id: 'hero', label: 'Home', index: '00' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'work', label: 'Work', index: '04' },
  { id: 'education', label: 'Education', index: '05' },
  { id: 'certifications', label: 'Certifications', index: '06' },
  { id: 'tech-trivia', label: 'Trivia', index: '07' },
  { id: 'contact', label: 'Contact', index: '08' },
]

/** Section ids in scroll order — used by the camera rig + scroll progress. */
export const sectionOrder: string[] = navigation.map((n) => n.id)

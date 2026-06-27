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

export const navigation: NavItem[] = [
  { id: 'hero', label: 'Home', index: '00' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'research', label: 'Research', index: '05' },
  { id: 'education', label: 'Education', index: '06' },
  { id: 'achievements', label: 'Achievements', index: '07' },
  { id: 'certifications', label: 'Certifications', index: '08' },
  { id: 'contact', label: 'Contact', index: '09' },
]

/** Section ids in scroll order — used by the camera rig + scroll progress. */
export const sectionOrder: string[] = navigation.map((n) => n.id)

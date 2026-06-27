/** Awards & achievements. Renders as a glowing card grid. */
export interface Achievement {
  id: string
  title: string
  org: string
  year: string
  description: string
  icon: 'trophy' | 'medal' | 'star' | 'rocket' | 'brain' | 'code'
}

export const achievements: Achievement[] = [
  {
    id: 'hackathon-1',
    title: 'National AI Hackathon — Winner',
    org: 'Tech Summit',
    year: '2025',
    description: 'First place for a real-time computer-vision safety system built in 36 hours.',
    icon: 'trophy',
  },
  {
    id: 'deans-list',
    title: "Dean's List",
    org: 'NUST SEECS',
    year: '2024',
    description: 'Recognised for sustained academic excellence in Computer Engineering.',
    icon: 'medal',
  },
  {
    id: 'research-grant',
    title: 'Undergraduate Research Grant',
    org: 'NUST',
    year: '2025',
    description: 'Awarded funding to pursue real-time video analytics research.',
    icon: 'brain',
  },
  {
    id: 'oss',
    title: 'Open-Source Contributor',
    org: 'Vision / ML ecosystem',
    year: '2024',
    description: 'Merged contributions into popular computer-vision tooling libraries.',
    icon: 'code',
  },
  {
    id: 'speaker',
    title: 'Invited Tech Speaker',
    org: 'University AI Society',
    year: '2025',
    description: 'Delivered a talk on deploying deep-learning models to the edge.',
    icon: 'star',
  },
  {
    id: 'product',
    title: 'Product Launch — 5k+ users',
    org: 'Side project',
    year: '2024',
    description: 'Shipped an ML-powered web product that crossed five thousand users.',
    icon: 'rocket',
  },
]

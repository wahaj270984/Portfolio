/** Professional / research experience, newest first. Renders as a 3D timeline. */
export interface ExperienceItem {
  id: string
  role: string
  org: string
  period: string
  location: string
  summary: string
  achievements: string[]
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'ml-research-intern',
    role: 'Machine Learning Research Intern',
    org: 'Vision & AI Research Lab',
    period: '2025 — Present',
    location: 'NUST SEECS',
    summary:
      'Researching real-time video analytics and multi-object tracking for large-scale camera networks.',
    achievements: [
      'Designed a dynamic batching scheduler improving multi-stream throughput 2.3×',
      'Published internal benchmarks for tracking under occlusion',
      'Mentored two junior students on the CV pipeline',
    ],
    tags: ['Computer Vision', 'PyTorch', 'Video Analytics'],
  },
  {
    id: 'cv-engineer',
    role: 'Computer Vision Engineer (Part-time)',
    org: 'Independent / Freelance',
    period: '2024 — 2025',
    location: 'Remote',
    summary:
      'Built and deployed custom detection and segmentation models for startup clients.',
    achievements: [
      'Shipped 6 production vision models across retail and robotics',
      'Cut a client inference bill 60% via quantisation + batching',
    ],
    tags: ['Detection', 'Segmentation', 'Deployment'],
  },
  {
    id: 'fullstack-dev',
    role: 'Full-Stack Developer',
    org: 'University Projects & Hackathons',
    period: '2023 — 2024',
    location: 'Islamabad',
    summary:
      'Delivered web platforms pairing ML backends with polished React frontends.',
    achievements: [
      'Won 2 hackathons with ML-powered web products',
      'Built reusable component systems used across team projects',
    ],
    tags: ['React', 'Node.js', 'TypeScript'],
  },
]

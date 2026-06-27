/** Research publications / work-in-progress. Renders as floating paper cards. */
export interface Publication {
  id: string
  title: string
  venue: string
  year: string
  status: 'Published' | 'Under Review' | 'In Progress'
  authors: string
  abstract: string
  tags: string[]
  link?: string
}

export const research: Publication[] = [
  {
    id: 'occlusion-tracking',
    title: 'Robust Multi-Object Tracking under Heavy Occlusion in Dense Scenes',
    venue: 'Workshop on Real-Time Vision',
    year: '2025',
    status: 'Under Review',
    authors: 'M. W. Khan, et al.',
    abstract:
      'We propose an occlusion-aware association strategy that combines motion priors with appearance re-identification to reduce identity switches in crowded multi-camera environments.',
    tags: ['Tracking', 'Re-ID', 'Real-time'],
    link: '#',
  },
  {
    id: 'efficient-vision',
    title: 'Quantisation-Aware Training for Sub-Watt Pose Estimation on the Edge',
    venue: 'Embedded ML Symposium',
    year: '2024',
    status: 'Published',
    authors: 'M. W. Khan, A. Researcher',
    abstract:
      'A study of INT8 quantisation-aware training schedules that preserve keypoint accuracy while meeting strict embedded power budgets, validated on robotic hardware.',
    tags: ['Quantisation', 'Edge AI', 'Pose'],
    link: '#',
  },
  {
    id: 'generative-layout',
    title: 'Structured Decoding for Editable Generative User Interfaces',
    venue: 'Preprint',
    year: '2024',
    status: 'In Progress',
    authors: 'M. W. Khan',
    abstract:
      'An approach to constrain diffusion-based UI generation into an editable layout grammar, bridging pixel-space generation and structured design tools.',
    tags: ['Generative AI', 'HCI', 'Diffusion'],
  },
]

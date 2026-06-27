/**
 * Featured projects. Each renders as a floating holographic card that opens a
 * detail modal. Images are gradient placeholders (no binary assets) keyed by
 * `accent`; swap `links` for real repos/demos later.
 */
export interface Project {
  id: string
  title: string
  tagline: string
  year: string
  category: string
  accent: 'primary' | 'accent' | 'violet'
  featured: boolean
  description: string
  tech: string[]
  highlights: string[]
  challenges: string
  links: {
    github?: string
    demo?: string
  }
}

export const projects: Project[] = [
  {
    id: 'vision-analytics',
    title: 'Sentinel Vision Analytics',
    tagline: 'Real-time multi-camera video analytics platform',
    year: '2025',
    category: 'Computer Vision',
    accent: 'primary',
    featured: true,
    description:
      'A real-time video analytics engine performing multi-object detection, tracking, and anomaly flagging across dozens of concurrent camera streams, with a live operator dashboard.',
    tech: ['PyTorch', 'OpenCV', 'YOLOv8', 'ByteTrack', 'FastAPI', 'React'],
    highlights: [
      'Sustained 30 FPS inference on 16 concurrent streams via batched GPU scheduling',
      'Custom ByteTrack variant cut ID-switches by 38%',
      'WebSocket dashboard with sub-200ms event latency',
    ],
    challenges:
      'Balancing per-stream latency against GPU throughput required a dynamic batching scheduler that groups frames across cameras while respecting a hard latency budget.',
    links: { github: '#', demo: '#' },
  },
  {
    id: 'neural-search',
    title: 'Atlas Neural Search',
    tagline: 'Semantic image + document retrieval engine',
    year: '2025',
    category: 'Generative AI',
    accent: 'accent',
    featured: true,
    description:
      'A multimodal semantic search system embedding images and text into a shared space, with an approximate-nearest-neighbour index serving millions of vectors in milliseconds.',
    tech: ['CLIP', 'PyTorch', 'FAISS', 'Next.js', 'TypeScript'],
    highlights: [
      'Unified CLIP embedding space for cross-modal queries',
      'FAISS HNSW index: <15ms p99 over 4M vectors',
      'Streaming relevance re-ranking with a lightweight cross-encoder',
    ],
    challenges:
      'Keeping recall high while staying interactive meant tuning the HNSW graph and adding a cheap re-ranking stage that only fires on the top candidates.',
    links: { github: '#', demo: '#' },
  },
  {
    id: 'edge-pose',
    title: 'EdgePose Robotics',
    tagline: 'On-device pose estimation for embedded robotics',
    year: '2024',
    category: 'Robotics / Embedded',
    accent: 'violet',
    featured: true,
    description:
      'A quantised human-pose estimation pipeline running on embedded hardware to drive a robotic assistant, optimised for sub-watt power draw.',
    tech: ['TensorFlow Lite', 'C++', 'OpenCV', 'Raspberry Pi', 'ROS'],
    highlights: [
      'INT8 quantisation with <2% accuracy loss',
      '24 FPS pose tracking on a Pi 4 at 0.8W',
      'ROS node integration for closed-loop control',
    ],
    challenges:
      'Fitting a real-time model into the embedded power and memory envelope demanded aggressive quantisation plus a hand-tuned C++ inference loop.',
    links: { github: '#' },
  },
  {
    id: 'genui-studio',
    title: 'GenUI Studio',
    tagline: 'Generative UI playground powered by diffusion',
    year: '2024',
    category: 'Generative AI / Web',
    accent: 'primary',
    featured: false,
    description:
      'An experimental web studio that turns natural-language prompts into editable UI layouts using a fine-tuned diffusion model and a structured layout decoder.',
    tech: ['Diffusers', 'Python', 'React', 'Three.js', 'WebGL'],
    highlights: [
      'Prompt-to-layout in under 3 seconds',
      'Structured decoder keeps generations editable, not just pixels',
    ],
    challenges:
      'Mapping freeform diffusion output back into a constrained, editable layout grammar was the core research problem.',
    links: { github: '#', demo: '#' },
  },
  {
    id: 'med-segment',
    title: 'MedSegment',
    tagline: 'Medical image segmentation research toolkit',
    year: '2023',
    category: 'Deep Learning',
    accent: 'accent',
    featured: false,
    description:
      'A research toolkit for biomedical image segmentation built around a U-Net family with attention gates, plus reproducible training and evaluation harnesses.',
    tech: ['PyTorch', 'MONAI', 'NumPy', 'Docker'],
    highlights: [
      'Attention U-Net reached 0.91 Dice on the benchmark set',
      'Fully reproducible Docker-based training pipeline',
    ],
    challenges:
      'Class imbalance and tiny structures required a compound loss and careful augmentation to avoid the model collapsing to background.',
    links: { github: '#' },
  },
  {
    id: 'portfolio-3d',
    title: 'Immersive 3D Portfolio',
    tagline: 'This site — a WebGL universe',
    year: '2026',
    category: 'Creative / Web',
    accent: 'violet',
    featured: false,
    description:
      'A scroll-driven 3D portfolio with a persistent WebGL canvas, custom GLSL shaders, adaptive quality, and a working in-browser terminal — built for 60fps.',
    tech: ['React Three Fiber', 'GLSL', 'GSAP', 'Lenis', 'TypeScript'],
    highlights: [
      'Single persistent canvas with adaptive DPR + quality tiers',
      'Custom holographic + nebula shaders',
      'Fully keyboard-accessible and reduced-motion aware',
    ],
    challenges:
      'Keeping a rich 3D world at 60fps meant instancing everything, gating post-processing by measured frame rate, and never re-rendering React from the animation loop.',
    links: { github: '#', demo: '#' },
  },
]

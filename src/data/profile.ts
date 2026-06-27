/**
 * High-level profile content: bio, headline stats, and interests. Placeholder
 * copy the owner swaps later — structured so the UI never hard-codes strings.
 */
export interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
}

export const profile = {
  name: 'Muhammad Wahaj Khan',
  headline: 'I build intelligent systems that see, reason, and ship.',
  summary:
    'Computer Engineering student at NUST SEECS and machine-learning researcher focused on computer vision, deep learning, and generative AI. I move comfortably from CUDA-level model work to production full-stack interfaces — turning research into things people can actually use.',
  bio: [
    'My work sits at the intersection of research and engineering: training and optimising vision models, then wrapping them in fast, well-crafted web experiences.',
    'I care about systems that are both rigorous and delightful — measurable accuracy under the hood, and an interface that feels effortless on top.',
  ],
  interests: [
    'Artificial Intelligence',
    'Computer Vision',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Web Development',
    'Robotics',
    'Embedded Systems',
    'Research',
  ],
  stats: [
    { label: 'Projects shipped', value: 24, suffix: '+' },
    { label: 'Research areas', value: 5 },
    { label: 'Models trained', value: 40, suffix: '+' },
    { label: 'Coffee per week', value: 21, suffix: '☕' },
  ] satisfies Stat[],
} as const

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
  headline: 'Building a strong foundation in ML, programming, and digital systems.',
  summary:
    'Computer Engineering student at NUST and Research Officer Intern at PNEC NUST’s Video Analytics Lab, with a strong foundation in machine learning, programming, and digital systems. Experienced in supervised learning concepts and practical implementation using Python, with additional exposure to data analysis and database-driven software development.',
  bio: [
    'I completed academic and self-driven projects in computer architecture and backend systems — from an 8-bit SAP-1 CPU in Verilog to a database-driven inventory system in Python and MySQL.',
    'I enjoy work that rewards problem-solving and systems thinking: understanding how things work end to end, from logic gates and processor cycles up to model training and data pipelines.',
  ],
  interests: [
    'Machine Learning',
    'Supervised Learning',
    'Computer Architecture',
    'Digital Logic Design',
    'Data Analysis',
    'Backend Development',
    'Embedded Systems',
    'Python',
  ],
  stats: [
    { label: 'Academic Projects', value: 3 },
    { label: 'Certifications', value: 3 },
    { label: 'Core Languages', value: 3 },
    { label: 'FSc Grade', value: 81, suffix: '%' },
  ] satisfies Stat[],
} as const

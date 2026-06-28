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
  /**
   * Optional cover image. A public-folder path (e.g. 'projects/sap1.jpg' served
   * from /public/projects/), referenced via asset(). If the file is missing the
   * card/modal gracefully fall back to the gradient placeholder.
   */
  image?: string
  links: {
    github?: string
    demo?: string
  }
}

export const projects: Project[] = [
  {
    id: 'sap1-computer',
    title: '8-Bit Computer (SAP-1)',
    tagline: 'An 8-bit SAP-1 CPU designed in Verilog HDL',
    year: '2025',
    category: 'Computer Architecture',
    accent: 'primary',
    featured: true,
    description:
      'Designed and implemented an 8-bit SAP-1 computer architecture in Verilog HDL using digital logic components — building the ALU, control unit, registers, and memory, then verifying instruction cycles in simulation.',
    tech: ['Verilog HDL', 'ModelSim', 'Proteus', 'Digital Logic'],
    highlights: [
      'Built the ALU, control unit, registers, and memory system',
      'Simulated processor instruction cycles (e.g. ADD) end to end',
      'Verified hardware timing and execution using ModelSim and Proteus',
    ],
    challenges:
      'Coordinating the control unit with the datapath so each instruction cycle fetched, decoded, and executed correctly while respecting hardware timing in simulation.',
    image: 'projects/sap1-computer.png',
    links: {},
  },
  {
    id: 'parking-system',
    title: 'Parking Management System',
    tagline: 'Hardware logic system for parking availability',
    year: '2025',
    category: 'Digital Logic Design',
    accent: 'accent',
    featured: true,
    description:
      'A hardware-based logic system to monitor and manage parking-space availability, implemented with combinational and sequential logic and verified in simulation.',
    tech: ['Digital Logic', 'Proteus', 'Flip-Flops', 'Counters'],
    highlights: [
      'Combinational and sequential circuits using logic gates, flip-flops, and counters',
      'Simulated circuit behaviour and verified correct state transitions in Proteus',
    ],
    challenges:
      'Designing reliable occupancy counting and state transitions using only gates, flip-flops, and counters.',
    image: 'projects/parking-system.jpg',
    links: {},
  },
  {
    id: 'inventory-system',
    title: 'Inventory Management System',
    tagline: 'Database-driven inventory system in Python + MySQL',
    year: '2025',
    category: 'Backend / Databases',
    accent: 'violet',
    featured: true,
    description:
      'A database-driven inventory management system built in Python with a MySQL backend — full CRUD operations and a relational schema for persistent storage.',
    tech: ['Python', 'MySQL', 'CRUD', 'SQL'],
    highlights: [
      'CRUD operations with MySQL integration for persistent storage',
      'Relational schema design for clean, queryable data',
    ],
    challenges:
      'Designing a sound relational schema and wiring reliable CRUD operations against the MySQL backend.',
    image: 'projects/inventory-system.jpg',
    links: {},
  },
]

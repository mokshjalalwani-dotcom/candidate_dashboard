import type { ApplicationStatus } from '@/types';

const COLLEGES = [
  'IIT Bombay',
  'IIT Delhi',
  'NIT Trichy',
  'BITS Pilani',
  'VIT Vellore',
  'IIT Madras',
  'Delhi Technological University',
  'NSIT Delhi',
  'Jadavpur University',
  'Anna University',
  'SRM University',
  'Amity University',
  'IIIT Hyderabad',
  'IIT Roorkee',
  'IIT Kharagpur',
];

const SKILLS_POOL = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Django',
  'FastAPI',
  'Go',
  'Rust',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Tailwind CSS',
  'GraphQL',
  'REST APIs',
  'Machine Learning',
  'TensorFlow',
  'PyTorch',
  'Data Structures',
  'System Design',
  'CI/CD',
  'Git',
  'Java',
  'Spring Boot',
  'Figma',
  'Flutter',
  'React Native',
];

const STATUSES: ApplicationStatus[] = [
  'Pending',
  'Selected',
  'Rejected',
  'Interviewing',
];

// Seeded random: deterministic based on id
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function getSeededCollege(id: number): string {
  const rng = seededRandom(id * 7);
  return COLLEGES[Math.floor(rng() * COLLEGES.length)];
}

export function getSeededSkills(id: number): string[] {
  const rng = seededRandom(id * 13);
  const count = 2 + Math.floor(rng() * 4); // 2–5 skills
  const shuffled = [...SKILLS_POOL].sort(() => rng() - 0.5);
  return shuffled.slice(0, count);
}

export function getSeededStatus(id: number): ApplicationStatus {
  const rng = seededRandom(id * 3);
  return STATUSES[Math.floor(rng() * STATUSES.length)];
}

export function getSeededDate(id: number): string {
  const rng = seededRandom(id * 17);
  const now = Date.now();
  const sixMonthsMs = 180 * 24 * 60 * 60 * 1000;
  return new Date(now - Math.floor(rng() * sixMonthsMs)).toISOString();
}

import type { Applicant, ApplicationStatus } from '@/types';
import {
  getSeededCollege,
  getSeededSkills,
  getSeededStatus,
  getSeededDate,
} from '@/data/mockData';
import { getInitials } from '@/lib/utils';

interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: { city?: string; state?: string };
  image?: string;
}

interface DummyJsonResponse {
  users: DummyUser[];
}

function normalizeUser(user: DummyUser): Applicant {
  const name = `${user.firstName ?? 'Unknown'} ${user.lastName ?? ''}`.trim();
  const numericId = typeof user.id === 'number' ? user.id : parseInt(user.id, 10) || 0;

  return {
    id: `api-${user.id}`,
    name,
    email: user.email ?? `user${user.id}@unknown.com`,
    collegeName: getSeededCollege(numericId),
    skills: getSeededSkills(numericId),
    status: getSeededStatus(numericId) as ApplicationStatus,
    avatar: user.image,
    initials: getInitials(name),
    appliedAt: getSeededDate(numericId),
    phone: user.phone,
    location:
      user.address?.city && user.address?.state
        ? `${user.address.city}, ${user.address.state}`
        : user.address?.city ?? undefined,
    isLocal: false,
  };
}

export async function fetchApplicants(): Promise<Applicant[]> {
  const res = await fetch('https://dummyjson.com/users?limit=30&skip=0', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data: DummyJsonResponse = await res.json();

  if (!Array.isArray(data?.users)) {
    throw new Error('Unexpected API response shape');
  }

  return data.users.map(normalizeUser);
}

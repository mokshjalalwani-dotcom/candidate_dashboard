import { fetchApplicants } from '@/services/applicantService';
import DashboardClient from '@/components/dashboard/DashboardClient';
import type { Applicant } from '@/types';

// Server Component — fetches API data before rendering
export default async function DashboardPage() {
  let initialApplicants: Applicant[] = [];
  let initialError: string | null = null;

  try {
    initialApplicants = await fetchApplicants();
  } catch (err) {
    initialError = err instanceof Error ? err.message : 'Failed to load applicants';
  }

  return (
    <DashboardClient
      initialApplicants={initialApplicants}
      initialError={initialError}
    />
  );
}

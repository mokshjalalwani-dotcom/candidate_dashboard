'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Applicant } from '@/types';
import { ApplicantStoreProvider, useApplicantStore } from '@/store/StoreContext';
import Header from '@/components/layout/Header';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SearchBar from '@/components/dashboard/SearchBar';
import FilterBar from '@/components/dashboard/FilterBar';
import ApplicantGrid from '@/components/dashboard/ApplicantGrid';
import Pagination from '@/components/dashboard/Pagination';
import ApplicantDetailModal from '@/components/dashboard/ApplicantDetailModal';
import AddApplicantForm from '@/components/dashboard/AddApplicantForm';

interface Props {
  initialApplicants: Applicant[];
  initialError: string | null;
}

// Inner component — has access to store
function DashboardInner() {
  const initLocalApplicants = useApplicantStore((s) => s.initLocalApplicants);

  // Load localStorage applicants after hydration
  useEffect(() => {
    initLocalApplicants();
  }, [initLocalApplicants]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Applicant Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Review, search, and manage all internship candidates in one place.
          </p>
        </motion.div>

        <SummaryCards />

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar />
            <FilterBar />
          </div>
        </div>

        <ApplicantGrid />
        <Pagination />
      </main>

      <ApplicantDetailModal />
      <AddApplicantForm />
    </>
  );
}

// Outer component — provides store with server-fetched initial data
export default function DashboardClient({ initialApplicants, initialError }: Props) {
  return (
    <ApplicantStoreProvider
      initialApiApplicants={initialApplicants}
      initialError={initialError}
    >
      <DashboardInner />
    </ApplicantStoreProvider>
  );
}

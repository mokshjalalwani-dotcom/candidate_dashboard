'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApplicantStore } from '@/store/StoreContext';
import { fetchApplicants } from '@/services/applicantService';

import Header from '@/components/layout/Header';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SearchBar from '@/components/dashboard/SearchBar';
import FilterBar from '@/components/dashboard/FilterBar';
import ApplicantGrid from '@/components/dashboard/ApplicantGrid';
import Pagination from '@/components/dashboard/Pagination';
import ApplicantDetailModal from '@/components/dashboard/ApplicantDetailModal';
import AddApplicantForm from '@/components/dashboard/AddApplicantForm';

export default function DashboardPage() {
  const setApiApplicants = useApplicantStore((s) => s.setApiApplicants);
  const setLoading = useApplicantStore((s) => s.setLoading);
  const setError = useApplicantStore((s) => s.setError);
  const initLocalApplicants = useApplicantStore((s) => s.initLocalApplicants);

  useEffect(() => {
    // Load persisted local applicants from localStorage
    initLocalApplicants();

    // Fetch API applicants
    setLoading(true);
    fetchApplicants()
      .then((data) => {
        setApiApplicants(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load applicants');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setApiApplicants, setLoading, setError, initLocalApplicants]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page title */}
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

        {/* Summary cards */}
        <SummaryCards />

        {/* Search + Filter toolbar */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar />
            <FilterBar />
          </div>
        </div>

        {/* Applicant grid */}
        <ApplicantGrid />

        {/* Pagination */}
        <Pagination />
      </main>

      {/* Modals */}
      <ApplicantDetailModal />
      <AddApplicantForm />
    </>
  );
}


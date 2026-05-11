'use client';

import { motion } from 'framer-motion';
import { SearchX, Users } from 'lucide-react';
import { useApplicantStore } from '@/store/StoreContext';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasFilters: boolean;
}

export default function EmptyState({ hasFilters }: EmptyStateProps) {
  const setSearch = useApplicantStore((s) => s.setSearch);
  const setStatusFilter = useApplicantStore((s) => s.setStatusFilter);
  const setAddFormOpen = useApplicantStore((s) => s.setAddFormOpen);

  const handleReset = () => {
    setSearch('');
    setStatusFilter('All');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-20 px-6 text-center dark:border-gray-800 dark:bg-gray-900/30"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
        {hasFilters ? (
          <SearchX className="h-8 w-8 text-gray-400" />
        ) : (
          <Users className="h-8 w-8 text-gray-400" />
        )}
      </div>

      {hasFilters ? (
        <>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            No applicants found
          </h3>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Your search or filter returned no results. Try adjusting your criteria.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={handleReset}
          >
            Clear filters
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            No applicants yet
          </h3>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Add your first applicant to get started.
          </p>
          <Button size="sm" className="mt-5" onClick={() => setAddFormOpen(true)}>
            Add Applicant
          </Button>
        </>
      )}
    </motion.div>
  );
}


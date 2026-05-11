'use client';

import { motion } from 'framer-motion';
import { SearchX, UserPlus } from 'lucide-react';
import { useApplicantStore } from '@/store/StoreContext';
import { Button } from '@/components/ui/button';

interface Props {
  hasFilters: boolean;
}

export default function EmptyState({ hasFilters }: Props) {
  const setSearch = useApplicantStore((s) => s.setSearch);
  const setStatusFilter = useApplicantStore((s) => s.setStatusFilter);
  const setAddFormOpen = useApplicantStore((s) => s.setAddFormOpen);

  const handleReset = () => {
    setSearch('');
    setStatusFilter('All');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-gray-900/30 py-20 px-6 text-center"
    >
      {/* Icon with gradient ring */}
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
          {hasFilters ? (
            <SearchX className="h-9 w-9 text-gray-400" />
          ) : (
            <UserPlus className="h-9 w-9 text-gray-400" />
          )}
        </div>
      </div>

      {hasFilters ? (
        <>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            No applicants match your filters
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
            Try broadening your search or selecting a different status filter.
          </p>
          <Button variant="outline" size="sm" className="mt-6 gap-2" onClick={handleReset}>
            Clear all filters
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            No applicants yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
            Add your first candidate to get started tracking applications.
          </p>
          <Button size="sm" className="mt-6 gap-2" onClick={() => setAddFormOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Add First Applicant
          </Button>
        </>
      )}
    </motion.div>
  );
}

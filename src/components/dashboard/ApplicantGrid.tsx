'use client';

import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useApplicantStore } from '@/store/StoreContext';
import ApplicantCard from './ApplicantCard';
import ApplicantCardSkeleton from './ApplicantCardSkeleton';
import EmptyState from './EmptyState';

export default function ApplicantGrid() {
  const isLoading = useApplicantStore((s) => s.isLoading);
  const error = useApplicantStore((s) => s.error);
  const search = useApplicantStore((s) => s.search);
  const statusFilter = useApplicantStore((s) => s.statusFilter);
  const sortField = useApplicantStore((s) => s.sortField);
  const sortOrder = useApplicantStore((s) => s.sortOrder);
  const page = useApplicantStore((s) => s.page);
  const pageSize = useApplicantStore((s) => s.pageSize);
  const apiApplicants = useApplicantStore((s) => s.apiApplicants);
  const localApplicants = useApplicantStore((s) => s.localApplicants);

  const paginated = useMemo(() => {
    const all = [...localApplicants, ...apiApplicants];
    let result = all;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.collegeName.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter((a) => a.status === statusFilter);
    }

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortField === 'appliedAt')
        cmp = new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    const start = (page - 1) * pageSize;
    return result.slice(start, start + pageSize);
  }, [search, statusFilter, sortField, sortOrder, page, pageSize, apiApplicants, localApplicants]);

  const isEmpty = useMemo(() => {
    const all = [...localApplicants, ...apiApplicants];
    let result = all;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.collegeName.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') result = result.filter((a) => a.status === statusFilter);
    return result.length === 0;
  }, [search, statusFilter, apiApplicants, localApplicants]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <ApplicantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/20">
        <p className="text-sm font-medium text-red-700 dark:text-red-400">
          Failed to load applicants
        </p>
        <p className="mt-1 text-xs text-red-500">{error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return <EmptyState hasFilters={!!search || statusFilter !== 'All'} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {paginated.map((applicant, i) => (
          <ApplicantCard key={applicant.id} applicant={applicant} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}


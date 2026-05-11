'use client';

import { useMemo } from 'react';
import { useApplicantStore } from '@/store/StoreContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pagination() {
  const page = useApplicantStore((s) => s.page);
  const setPage = useApplicantStore((s) => s.setPage);
  const pageSize = useApplicantStore((s) => s.pageSize);
  const search = useApplicantStore((s) => s.search);
  const statusFilter = useApplicantStore((s) => s.statusFilter);
  const apiApplicants = useApplicantStore((s) => s.apiApplicants);
  const localApplicants = useApplicantStore((s) => s.localApplicants);

  // Compute filtered count with stable deps — returns a number (primitive)
  const filteredCount = useMemo(() => {
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
    return result.length;
  }, [search, statusFilter, apiApplicants, localApplicants]);

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));

  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, filteredCount);

  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between flex-wrap gap-3"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{' '}
        <span className="font-medium text-gray-700 dark:text-gray-300">{start}–{end}</span> of{' '}
        <span className="font-medium text-gray-700 dark:text-gray-300">{filteredCount}</span> applicants
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">…</span>
          ) : (
            <Button
              key={p}
              variant={page === p ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8 text-xs"
              onClick={() => setPage(p as number)}
              aria-label={`Page ${p}`}
              aria-current={page === p ? 'page' : undefined}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}


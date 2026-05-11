'use client';

import { useApplicantStore } from '@/store/StoreContext';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import type { ApplicationStatus, SortField, SortOrder } from '@/types';
import { ArrowUpDown } from 'lucide-react';
import { useMemo } from 'react';

const STATUS_OPTIONS: { value: ApplicationStatus | 'All'; label: string }[] = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Selected', label: 'Selected' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Interviewing', label: 'Interviewing' },
];

const SORT_FIELD_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'name', label: 'Sort by Name' },
  { value: 'status', label: 'Sort by Status' },
  { value: 'appliedAt', label: 'Sort by Date' },
];

const SORT_ORDER_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export default function FilterBar() {
  // Stable primitive selectors — no new object/array references
  const statusFilter = useApplicantStore((s) => s.statusFilter);
  const sortField = useApplicantStore((s) => s.sortField);
  const sortOrder = useApplicantStore((s) => s.sortOrder);
  const setStatusFilter = useApplicantStore((s) => s.setStatusFilter);
  const setSortField = useApplicantStore((s) => s.setSortField);
  const setSortOrder = useApplicantStore((s) => s.setSortOrder);

  // Count as primitive — no infinite loop
  const search = useApplicantStore((s) => s.search);
  const apiApplicants = useApplicantStore((s) => s.apiApplicants);
  const localApplicants = useApplicantStore((s) => s.localApplicants);

  // Compute filtered count locally with useMemo
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
    if (statusFilter !== 'All') {
      result = result.filter((a) => a.status === statusFilter);
    }
    return result.length;
  }, [search, statusFilter, apiApplicants, localApplicants]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={statusFilter}
        onValueChange={(v) => setStatusFilter(v as ApplicationStatus | 'All')}
      >
        <SelectTrigger className="w-40" id="status-filter" aria-label="Filter by status">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
        <SelectTrigger className="w-40" id="sort-field" aria-label="Sort field">
          <ArrowUpDown className="h-3.5 w-3.5 mr-1 text-gray-400 flex-shrink-0" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_FIELD_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
        <SelectTrigger className="w-36" id="sort-order" aria-label="Sort order">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDER_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
        {filteredCount} result{filteredCount !== 1 ? 's' : ''}
      </span>
    </div>
  );
}


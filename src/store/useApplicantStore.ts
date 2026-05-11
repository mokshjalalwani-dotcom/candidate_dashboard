import { create } from 'zustand';
import type { Applicant, ApplicationStatus, SortField, SortOrder } from '@/types';

const LOCAL_STORAGE_KEY = 'candidate-dashboard-local-applicants';

function loadLocalApplicants(): Applicant[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalApplicants(applicants: Applicant[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applicants));
  } catch {
    // silently ignore quota errors
  }
}

interface ApplicantStore {
  // Data
  apiApplicants: Applicant[];
  localApplicants: Applicant[];
  isLoading: boolean;
  error: string | null;

  // Filters
  search: string;
  statusFilter: ApplicationStatus | 'All';
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;

  // Selected applicant
  selectedApplicant: Applicant | null;
  isDetailOpen: boolean;

  // Add form
  isAddFormOpen: boolean;

  // Actions
  setApiApplicants: (applicants: Applicant[]) => void;
  addLocalApplicant: (applicant: Applicant) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: ApplicationStatus | 'All') => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setPage: (page: number) => void;
  selectApplicant: (applicant: Applicant | null) => void;
  setDetailOpen: (open: boolean) => void;
  setAddFormOpen: (open: boolean) => void;
  initLocalApplicants: () => void;

  // Computed
  getAllApplicants: () => Applicant[];
  getFilteredApplicants: () => Applicant[];
  getPaginatedApplicants: () => Applicant[];
  getTotalPages: () => number;
  getStatusCounts: () => Record<string, number>;
}

export const useApplicantStore = create<ApplicantStore>((set, get) => ({
  apiApplicants: [],
  localApplicants: [],
  isLoading: true,
  error: null,

  search: '',
  statusFilter: 'All',
  sortField: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 9,

  selectedApplicant: null,
  isDetailOpen: false,

  isAddFormOpen: false,

  setApiApplicants: (applicants) => set({ apiApplicants: applicants }),
  
  addLocalApplicant: (applicant) => {
    const updated = [applicant, ...get().localApplicants];
    saveLocalApplicants(updated);
    set({ localApplicants: updated });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearch: (search) => set({ search, page: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, page: 1 }),
  setSortField: (field) => set({ sortField: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setPage: (page) => set({ page }),
  
  selectApplicant: (applicant) =>
    set({ selectedApplicant: applicant, isDetailOpen: applicant !== null }),
  setDetailOpen: (open) =>
    set({ isDetailOpen: open, selectedApplicant: open ? get().selectedApplicant : null }),
  setAddFormOpen: (open) => set({ isAddFormOpen: open }),

  initLocalApplicants: () => {
    set({ localApplicants: loadLocalApplicants() });
  },

  getAllApplicants: () => {
    const { localApplicants, apiApplicants } = get();
    return [...localApplicants, ...apiApplicants];
  },

  getFilteredApplicants: () => {
    const { search, statusFilter, sortField, sortOrder } = get();
    let result = get().getAllApplicants();

    // Search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.collegeName.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((a) => a.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') {
        cmp = a.name.localeCompare(b.name);
      } else if (sortField === 'status') {
        cmp = a.status.localeCompare(b.status);
      } else if (sortField === 'appliedAt') {
        cmp = new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  },

  getPaginatedApplicants: () => {
    const { page, pageSize } = get();
    const filtered = get().getFilteredApplicants();
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  },

  getTotalPages: () => {
    const { pageSize } = get();
    return Math.max(1, Math.ceil(get().getFilteredApplicants().length / pageSize));
  },

  getStatusCounts: () => {
    const all = get().getAllApplicants();
    return {
      Total: all.length,
      Pending: all.filter((a) => a.status === 'Pending').length,
      Selected: all.filter((a) => a.status === 'Selected').length,
      Rejected: all.filter((a) => a.status === 'Rejected').length,
      Interviewing: all.filter((a) => a.status === 'Interviewing').length,
    };
  },
}));

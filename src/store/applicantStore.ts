import { createStore } from 'zustand/vanilla';
import type { Applicant, ApplicationStatus, SortField, SortOrder } from '@/types';

const LOCAL_KEY = 'candidate-dashboard-local-applicants';

function loadLocal(): Applicant[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]'); } catch { return []; }
}
function saveLocal(a: Applicant[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(a)); } catch { /* quota */ }
}

export interface ApplicantState {
  apiApplicants: Applicant[];
  localApplicants: Applicant[];
  isLoading: boolean;
  error: string | null;
  search: string;
  statusFilter: ApplicationStatus | 'All';
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  selectedApplicant: Applicant | null;
  isDetailOpen: boolean;
  isAddFormOpen: boolean;
}

export interface ApplicantActions {
  setApiApplicants: (a: Applicant[]) => void;
  addLocalApplicant: (a: Applicant) => void;
  initLocalApplicants: () => void;
  setLoading: (v: boolean) => void;
  setError: (v: string | null) => void;
  setSearch: (v: string) => void;
  setStatusFilter: (v: ApplicationStatus | 'All') => void;
  setSortField: (v: SortField) => void;
  setSortOrder: (v: SortOrder) => void;
  setPage: (v: number) => void;
  selectApplicant: (a: Applicant | null) => void;
  setDetailOpen: (v: boolean) => void;
  setAddFormOpen: (v: boolean) => void;
}

export type ApplicantStore = ApplicantState & ApplicantActions;

interface PreloadedState {
  apiApplicants?: Applicant[];
  isLoading?: boolean;
  error?: string | null;
}

export function createApplicantStore(preloaded?: PreloadedState) {
  return createStore<ApplicantStore>()((set, get) => ({
    // Seed from server-fetched data if provided
    apiApplicants: preloaded?.apiApplicants ?? [],
    localApplicants: [],
    isLoading: preloaded ? false : true,
    error: preloaded?.error ?? null,
    search: '',
    statusFilter: 'All',
    sortField: 'name',
    sortOrder: 'asc',
    page: 1,
    pageSize: 9,
    selectedApplicant: null,
    isDetailOpen: false,
    isAddFormOpen: false,

    setApiApplicants: (a) => set({ apiApplicants: a }),
    addLocalApplicant: (a) => {
      const updated = [a, ...get().localApplicants];
      saveLocal(updated);
      set({ localApplicants: updated });
    },
    initLocalApplicants: () => set({ localApplicants: loadLocal() }),
    setLoading: (v) => set({ isLoading: v }),
    setError: (v) => set({ error: v }),
    setSearch: (v) => set({ search: v, page: 1 }),
    setStatusFilter: (v) => set({ statusFilter: v, page: 1 }),
    setSortField: (v) => set({ sortField: v }),
    setSortOrder: (v) => set({ sortOrder: v }),
    setPage: (v) => set({ page: v }),
    selectApplicant: (a) => set({ selectedApplicant: a, isDetailOpen: a !== null }),
    setDetailOpen: (v) => set({ isDetailOpen: v, selectedApplicant: v ? get().selectedApplicant : null }),
    setAddFormOpen: (v) => set({ isAddFormOpen: v }),
  }));
}

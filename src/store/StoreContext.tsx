'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore } from 'zustand';
import { createApplicantStore, type ApplicantStore, type ApplicantState } from './applicantStore';
import type { Applicant } from '@/types';

type StoreApi = ReturnType<typeof createApplicantStore>;
const ApplicantStoreContext = createContext<StoreApi | null>(null);

interface ProviderProps {
  children: ReactNode;
  initialApiApplicants?: Applicant[];
  initialError?: string | null;
}

export function ApplicantStoreProvider({
  children,
  initialApiApplicants,
  initialError,
}: ProviderProps) {
  const storeRef = useRef<StoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createApplicantStore(
      initialApiApplicants !== undefined
        ? { apiApplicants: initialApiApplicants, error: initialError ?? null }
        : undefined
    );
  }
  return (
    <ApplicantStoreContext.Provider value={storeRef.current}>
      {children}
    </ApplicantStoreContext.Provider>
  );
}

export function useApplicantStore<T>(selector: (state: ApplicantStore) => T): T {
  const store = useContext(ApplicantStoreContext);
  if (!store) throw new Error('useApplicantStore must be used within ApplicantStoreProvider');
  return useStore(store, selector);
}

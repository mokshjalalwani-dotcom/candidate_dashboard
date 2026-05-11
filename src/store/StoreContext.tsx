'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore } from 'zustand';
import { createApplicantStore, type ApplicantStore } from './applicantStore';

type StoreApi = ReturnType<typeof createApplicantStore>;

const ApplicantStoreContext = createContext<StoreApi | null>(null);

export function ApplicantStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<StoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createApplicantStore();
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


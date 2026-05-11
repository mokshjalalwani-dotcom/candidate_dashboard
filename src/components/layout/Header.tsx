'use client';

import { Moon, Sun, Plus, BriefcaseBusiness } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApplicantStore } from '@/store/StoreContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const setAddFormOpen = useApplicantStore((s) => s.setAddFormOpen);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-sm">
              <BriefcaseBusiness className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-gray-900 dark:text-white leading-none block">
                TalentFlow
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-none">
                Candidate Dashboard
              </span>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
                className="h-9 w-9"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {/* Add applicant button */}
            <Button
              size="sm"
              onClick={() => setAddFormOpen(true)}
              className="gap-1.5"
              id="add-applicant-btn"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Applicant</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


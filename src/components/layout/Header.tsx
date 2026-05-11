'use client';

import { Moon, Sun, Plus, BriefcaseBusiness, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApplicantStore } from '@/store/StoreContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const setAddFormOpen = useApplicantStore((s) => s.setAddFormOpen);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Gradient accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500" />

      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-15 items-center justify-between gap-4 py-3">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md shadow-violet-500/25">
                <BriefcaseBusiness className="h-4.5 w-4.5 text-white" />
                <div className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400 shadow-sm">
                  <Sparkles className="h-1.5 w-1.5 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900 dark:text-white leading-none tracking-tight">
                  TalentFlow
                </div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-none">
                  Candidate Management
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2"
            >
              {/* Dark mode toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle dark mode"
                  className="h-9 w-9 rounded-xl"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}

              {/* Add applicant */}
              <Button
                size="sm"
                onClick={() => setAddFormOpen(true)}
                className="gap-1.5 rounded-xl h-9"
                id="add-applicant-btn"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Add Applicant</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

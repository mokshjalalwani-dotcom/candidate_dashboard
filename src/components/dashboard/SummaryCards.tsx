'use client';

import { motion } from 'framer-motion';
import { Users, CheckCircle2, Clock, XCircle, Mic } from 'lucide-react';
import { useApplicantStore } from '@/store/StoreContext';

const cardConfig = [
  {
    key: 'Total',
    label: 'Total Applicants',
    icon: Users,
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    ring: 'ring-violet-100 dark:ring-violet-900',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    key: 'Selected',
    label: 'Selected',
    icon: CheckCircle2,
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    ring: 'ring-emerald-100 dark:ring-emerald-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'Pending',
    label: 'Pending',
    icon: Clock,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    ring: 'ring-amber-100 dark:ring-amber-900',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    key: 'Rejected',
    label: 'Rejected',
    icon: XCircle,
    bg: 'bg-red-50 dark:bg-red-950/30',
    ring: 'ring-red-100 dark:ring-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  {
    key: 'Interviewing',
    label: 'Interviewing',
    icon: Mic,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    ring: 'ring-blue-100 dark:ring-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
];

export default function SummaryCards() {
  // Use stable primitive selectors — avoids new object reference on every render
  const apiLen = useApplicantStore((s) => s.apiApplicants.length);
  const localLen = useApplicantStore((s) => s.localApplicants.length);
  const isLoading = useApplicantStore((s) => s.isLoading);

  // Derive counts inline from stable array lengths + status breakdown
  const allApplicants = useApplicantStore((s) => s.apiApplicants);
  const localApplicants = useApplicantStore((s) => s.localApplicants);

  const total = apiLen + localLen;
  const all = [...localApplicants, ...allApplicants];

  const counts: Record<string, number> = {
    Total: total,
    Pending: all.filter((a) => a.status === 'Pending').length,
    Selected: all.filter((a) => a.status === 'Selected').length,
    Rejected: all.filter((a) => a.status === 'Rejected').length,
    Interviewing: all.filter((a) => a.status === 'Interviewing').length,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cardConfig.map((cfg, i) => {
        const Icon = cfg.icon;
        const count = counts[cfg.key] ?? 0;

        return (
          <motion.div
            key={cfg.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
            className={`rounded-2xl p-4 ring-1 ${cfg.bg} ${cfg.ring} flex flex-col gap-3`}
          >
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ${cfg.ring} dark:bg-gray-900`}>
              <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
            </div>
            {isLoading ? (
              <div className="space-y-1.5">
                <div className="h-7 w-12 rounded-lg bg-gray-200 animate-pulse dark:bg-gray-700" />
                <div className="h-3.5 w-20 rounded-md bg-gray-200 animate-pulse dark:bg-gray-700" />
              </div>
            ) : (
              <div>
                <motion.p
                  key={count}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                >
                  {count}
                </motion.p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cfg.label}</p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}


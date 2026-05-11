'use client';

import { motion } from 'framer-motion';
import { Users, CheckCircle2, Clock, XCircle, Mic2 } from 'lucide-react';
import { useApplicantStore } from '@/store/StoreContext';

const CARDS = [
  {
    key: 'Total',
    label: 'Total',
    icon: Users,
    gradient: 'from-violet-500 to-indigo-600',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    ring: 'ring-violet-100 dark:ring-violet-900/50',
    iconBg: 'bg-violet-100 dark:bg-violet-900/60',
    iconColor: 'text-violet-600 dark:text-violet-300',
    textColor: 'text-violet-700 dark:text-violet-300',
  },
  {
    key: 'Selected',
    label: 'Selected',
    icon: CheckCircle2,
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    ring: 'ring-emerald-100 dark:ring-emerald-900/50',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/60',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    textColor: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    key: 'Pending',
    label: 'Pending',
    icon: Clock,
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    ring: 'ring-amber-100 dark:ring-amber-900/50',
    iconBg: 'bg-amber-100 dark:bg-amber-900/60',
    iconColor: 'text-amber-600 dark:text-amber-300',
    textColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    key: 'Rejected',
    label: 'Rejected',
    icon: XCircle,
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-50 dark:bg-red-950/40',
    ring: 'ring-red-100 dark:ring-red-900/50',
    iconBg: 'bg-red-100 dark:bg-red-900/60',
    iconColor: 'text-red-600 dark:text-red-300',
    textColor: 'text-red-700 dark:text-red-300',
  },
  {
    key: 'Interviewing',
    label: 'Interviewing',
    icon: Mic2,
    gradient: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    ring: 'ring-blue-100 dark:ring-blue-900/50',
    iconBg: 'bg-blue-100 dark:bg-blue-900/60',
    iconColor: 'text-blue-600 dark:text-blue-300',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
];

export default function SummaryCards() {
  const apiApplicants = useApplicantStore((s) => s.apiApplicants);
  const localApplicants = useApplicantStore((s) => s.localApplicants);
  const isLoading = useApplicantStore((s) => s.isLoading);
  const all = [...localApplicants, ...apiApplicants];

  const counts: Record<string, number> = {
    Total: all.length,
    Pending: all.filter((a) => a.status === 'Pending').length,
    Selected: all.filter((a) => a.status === 'Selected').length,
    Rejected: all.filter((a) => a.status === 'Rejected').length,
    Interviewing: all.filter((a) => a.status === 'Interviewing').length,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {CARDS.map((card, i) => {
        const Icon = card.icon;
        const count = counts[card.key] ?? 0;
        const pct = counts.Total > 0 && card.key !== 'Total'
          ? Math.round((count / counts.Total) * 100)
          : null;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
            className={`relative overflow-hidden rounded-2xl p-4 ring-1 ${card.bg} ${card.ring} flex flex-col gap-3 group`}
          >
            {/* Icon */}
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBg}`}>
              <Icon className={`h-4.5 w-4.5 ${card.iconColor}`} />
            </div>

            {/* Count */}
            {isLoading ? (
              <div className="space-y-1.5">
                <div className="h-8 w-14 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ) : (
              <div>
                <motion.p
                  key={count}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-black text-gray-900 dark:text-gray-100 tabular-nums leading-none"
                >
                  {count}
                </motion.p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {card.label}
                  </span>
                  {pct !== null && (
                    <span className={`text-[10px] font-semibold ${card.textColor}`}>
                      {pct}%
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Decorative gradient blob */}
            <div className={`absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
          </motion.div>
        );
      })}
    </div>
  );
}

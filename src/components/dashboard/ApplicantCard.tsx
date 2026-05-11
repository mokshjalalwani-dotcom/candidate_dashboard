'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import type { Applicant, ApplicationStatus } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { useApplicantStore } from '@/store/StoreContext';

const STATUS_LEFT_BORDER: Record<ApplicationStatus, string> = {
  Pending: 'before:bg-amber-400',
  Selected: 'before:bg-emerald-400',
  Rejected: 'before:bg-red-400',
  Interviewing: 'before:bg-blue-400',
  Unknown: 'before:bg-gray-400',
};

interface Props {
  applicant: Applicant;
  index: number;
}

export default function ApplicantCard({ applicant, index }: Props) {
  const selectApplicant = useApplicantStore((s) => s.selectApplicant);

  const border = STATUS_LEFT_BORDER[applicant.status] ?? STATUS_LEFT_BORDER.Unknown;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
      onClick={() => selectApplicant(applicant)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectApplicant(applicant); } }}
      tabIndex={0}
      role="button"
      aria-label={`View profile for ${applicant.name}`}
      className={`group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm cursor-pointer
        transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-violet-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
        dark:bg-gray-900 dark:border-gray-800 dark:hover:border-violet-800
        before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:rounded-full ${border}`}
    >
      {/* NEW badge for locally added */}
      {applicant.isLocal && (
        <span className="absolute right-4 top-4 rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          New
        </span>
      )}

      {/* Avatar + name row */}
      <div className="flex items-center gap-3 pl-3">
        <Avatar className="h-11 w-11 ring-2 ring-white dark:ring-gray-800 shadow-sm flex-shrink-0">
          <AvatarImage src={applicant.avatar} alt={applicant.name} />
          <AvatarFallback className="text-sm font-semibold">{applicant.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
            {applicant.name}
          </h3>
          <p className="truncate text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {applicant.email}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="pl-3">
        <Badge variant={applicant.status as ApplicationStatus}>
          {applicant.status}
        </Badge>
      </div>

      {/* Info rows */}
      <div className="pl-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 min-w-0">
          <GraduationCap className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
          <span className="truncate">{applicant.collegeName}</span>
        </div>
        {applicant.location && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 min-w-0">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
            <span className="truncate">{applicant.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Applied {formatDate(applicant.appliedAt)}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="pl-3 flex flex-wrap gap-1.5 min-h-[1.5rem]">
        {applicant.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="skill" className="text-[10px] py-0">
            {skill}
          </Badge>
        ))}
        {applicant.skills.length > 3 && (
          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 self-center">
            +{applicant.skills.length - 3}
          </span>
        )}
      </div>

      {/* Hover CTA */}
      <div className="pl-3 flex items-center gap-1 text-[11px] font-semibold text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-all duration-200 -mt-1">
        <ArrowUpRight className="h-3.5 w-3.5" />
        View full profile
      </div>
    </motion.article>
  );
}

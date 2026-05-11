'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, GraduationCap, Calendar, ExternalLink } from 'lucide-react';
import type { Applicant, ApplicationStatus } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { useApplicantStore } from '@/store/StoreContext';

interface ApplicantCardProps {
  applicant: Applicant;
  index: number;
}

const STATUS_DOT: Record<ApplicationStatus, string> = {
  Pending: 'bg-amber-400',
  Selected: 'bg-emerald-400',
  Rejected: 'bg-red-400',
  Interviewing: 'bg-blue-400',
  Unknown: 'bg-gray-400',
};

export default function ApplicantCard({ applicant, index }: ApplicantCardProps) {
  const selectApplicant = useApplicantStore((s) => s.selectApplicant);

  const handleClick = () => selectApplicant(applicant);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectApplicant(applicant);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: 'easeOut' }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${applicant.name}`}
      className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-violet-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-violet-800 flex flex-col gap-4"
    >
      {/* Local badge */}
      {applicant.isLocal && (
        <span className="absolute top-3 right-3 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          NEW
        </span>
      )}

      {/* Header row */}
      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11 ring-2 ring-white shadow-sm dark:ring-gray-800 flex-shrink-0">
          <AvatarImage src={applicant.avatar} alt={applicant.name} />
          <AvatarFallback>{applicant.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm">
              {applicant.name}
            </h3>
            <span className={`inline-block h-2 w-2 rounded-full flex-shrink-0 ${STATUS_DOT[applicant.status] ?? STATUS_DOT.Unknown}`} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{applicant.email}</p>
        </div>
      </div>

      {/* Status badge */}
      <Badge variant={applicant.status as ApplicationStatus} className="w-fit text-xs">
        {applicant.status}
      </Badge>

      {/* Info rows */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <GraduationCap className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
          <span className="truncate">{applicant.collegeName}</span>
        </div>
        {applicant.location && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
            <span className="truncate">{applicant.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
          <span>Applied {formatDate(applicant.appliedAt)}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {applicant.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="skill" className="text-[10px] px-2 py-0.5">
            {skill}
          </Badge>
        ))}
        {applicant.skills.length > 3 && (
          <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center">
            +{applicant.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Hover CTA */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="flex items-center gap-1 text-[10px] font-medium text-violet-600 dark:text-violet-400">
          <ExternalLink className="h-3 w-3" /> View Details
        </span>
      </div>
    </motion.article>
  );
}


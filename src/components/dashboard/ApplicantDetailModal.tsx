'use client';

import { motion } from 'framer-motion';
import {
  Mail, Phone, GraduationCap, MapPin, Calendar, Briefcase,
  User, Link as LinkIcon
} from 'lucide-react';
import type { ApplicationStatus } from '@/types';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { useApplicantStore } from '@/store/StoreContext';

export default function ApplicantDetailModal() {
  const applicant = useApplicantStore((s) => s.selectedApplicant);
  const isOpen = useApplicantStore((s) => s.isDetailOpen);
  const setDetailOpen = useApplicantStore((s) => s.setDetailOpen);

  if (!applicant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setDetailOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Applicant Details — {applicant.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Full profile for {applicant.name}
          </DialogDescription>
        </DialogHeader>

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 py-4"
        >
          <Avatar className="h-20 w-20 ring-4 ring-violet-100 dark:ring-violet-900/40 shadow-md">
            <AvatarImage src={applicant.avatar} alt={applicant.name} />
            <AvatarFallback className="text-2xl">{applicant.initials}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{applicant.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{applicant.email}</p>
            <div className="flex justify-center mt-3">
              <Badge variant={applicant.status as ApplicationStatus} className="text-xs px-3 py-1">
                {applicant.status}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-800 -mx-6" />

        {/* Info grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2"
        >
          {[
            { icon: GraduationCap, label: 'College', value: applicant.collegeName },
            { icon: MapPin, label: 'Location', value: applicant.location ?? 'Not specified' },
            { icon: Phone, label: 'Phone', value: applicant.phone ?? 'Not specified' },
            { icon: Calendar, label: 'Applied', value: formatDate(applicant.appliedAt) },
            { icon: User, label: 'Applicant ID', value: applicant.id },
            { icon: Briefcase, label: 'Source', value: applicant.isLocal ? 'Manually Added' : 'API Import' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  {label}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5 break-all">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-800 -mx-6" />

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="py-2"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
            Skills
          </p>
          {applicant.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill) => (
                <Badge key={skill} variant="skill" className="text-xs px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500">No skills listed</p>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}


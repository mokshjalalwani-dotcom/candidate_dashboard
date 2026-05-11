'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

import { useApplicantStore } from '@/store/StoreContext';
import { getInitials } from '@/lib/utils';
import type { ApplicationStatus } from '@/types';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const STATUSES: ApplicationStatus[] = ['Pending', 'Selected', 'Rejected', 'Interviewing'];

// Keep schema without transforms so react-hook-form generics work correctly
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name too long'),
  email: z.string().email('Invalid email address'),
  collegeName: z.string().min(2, 'College name required').max(100, 'Name too long'),
  skills: z.string().min(1, 'Enter at least one skill'),
  status: z.enum(['Pending', 'Selected', 'Rejected', 'Interviewing']),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AddApplicantForm() {
  const isOpen = useApplicantStore((s) => s.isAddFormOpen);
  const setAddFormOpen = useApplicantStore((s) => s.setAddFormOpen);
  const addLocalApplicant = useApplicantStore((s) => s.addLocalApplicant);
  const apiApplicants = useApplicantStore((s) => s.apiApplicants);
  const localApplicants = useApplicantStore((s) => s.localApplicants);
  const allApplicants = [...localApplicants, ...apiApplicants];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'Pending' },
  });

  const onSubmit = (data: FormValues) => {
    // Parse the skills string manually
    const skillsList = data.skills.split(',').map((s) => s.trim()).filter(Boolean);

    // Duplicate email check
    const emailExists = allApplicants.some(
      (a) => a.email.toLowerCase() === data.email.toLowerCase()
    );
    if (emailExists) {
      toast.error('An applicant with this email already exists.');
      return;
    }

    addLocalApplicant({
      id: `local-${nanoid(8)}`,
      name: data.name,
      email: data.email,
      collegeName: data.collegeName,
      skills: skillsList,
      status: data.status as ApplicationStatus,
      initials: getInitials(data.name),
      appliedAt: new Date().toISOString(),
      phone: data.phone || undefined,
      location: data.location || undefined,
      isLocal: true,
    });

    toast.success(`${data.name} added successfully!`);
    reset();
    setAddFormOpen(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      reset();
      setAddFormOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Applicant</DialogTitle>
          <DialogDescription>
            Fill in the details below. Fields marked * are required.
          </DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 py-2"
          id="add-applicant-form"
          noValidate
        >
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="form-name">Full Name *</Label>
            <Input
              id="form-name"
              placeholder="e.g. Priya Sharma"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="form-email">Email Address *</Label>
            <Input
              id="form-email"
              type="email"
              placeholder="e.g. priya@example.com"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* College */}
          <div className="space-y-1.5">
            <Label htmlFor="form-college">College Name *</Label>
            <Input
              id="form-college"
              placeholder="e.g. IIT Bombay"
              aria-invalid={!!errors.collegeName}
              {...register('collegeName')}
            />
            {errors.collegeName && (
              <p className="text-xs text-red-500">{errors.collegeName.message}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <Label htmlFor="form-skills">Skills * <span className="text-gray-400 font-normal">(comma-separated)</span></Label>
            <Input
              id="form-skills"
              placeholder="e.g. React, TypeScript, Node.js"
              aria-invalid={!!errors.skills}
              {...register('skills')}
            />
            {errors.skills && (
              <p className="text-xs text-red-500">{String(errors.skills.message)}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="form-status">Application Status *</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="form-status" aria-invalid={!!errors.status}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Optional fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="form-phone">Phone <span className="text-gray-400 font-normal">(optional)</span></Label>
              <Input
                id="form-phone"
                type="tel"
                placeholder="+91 98765 43210"
                {...register('phone')}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="form-location">Location <span className="text-gray-400 font-normal">(optional)</span></Label>
              <Input
                id="form-location"
                placeholder="e.g. Mumbai, MH"
                {...register('location')}
              />
            </div>
          </div>
        </motion.form>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-applicant-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding…' : 'Add Applicant'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


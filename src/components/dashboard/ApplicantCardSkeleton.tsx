import { Skeleton } from '@/components/ui/skeleton';

export default function ApplicantCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:bg-gray-900 dark:border-gray-800 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Skeleton className="h-11 w-11 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <Skeleton className="h-5 w-20 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-3 w-28" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}


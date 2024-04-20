import { Skeleton } from 'components/ui/skeleton';

export const DeleteModalSkeleton = () => (
  <div className="container p-0 ">
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-1/3 mb-8" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
    </div>
    <div className="flex gap-2 mt-10 justify-end">
      <Skeleton className="h-9 w-1/4" />
      <Skeleton className="h-9 w-1/4" />
    </div>
  </div>
);

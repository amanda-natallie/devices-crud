import { Skeleton } from 'components/ui/skeleton';

export const DevicesModalSkeleton = () => {
  const array = [...Array(3).keys()];

  return (
    <div className="container p-0 ">
      {array.map(i => (
        <div key={i} className="flex flex-col gap-1 mb-2 justify-between items-start my-6">
          <Skeleton className="h-4 w-28 mb-3" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
      <div className="flex gap-2 mt-6 justify-end">
        <Skeleton className="h-9 w-1/4" />
        <Skeleton className="h-9 w-1/4" />
      </div>
    </div>
  );
};

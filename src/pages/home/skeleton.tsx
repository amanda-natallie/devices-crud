import { Skeleton } from 'components/ui/skeleton';

export const HomeSkeleton = () => {
  const array = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="container p-0 mt-6">
      <Skeleton className="h-4 w-36" />
      {array.map(i => (
        <div key={i}>
          <Skeleton className="h-[2px] w-full my-4" />
          <div className="flex mb-2 justify-between items-center">
            <div className="flex gap-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <Skeleton className="h-2 w-12" />
          </div>
          <Skeleton className="h-4 w-[270px]" />
        </div>
      ))}
    </div>
  );
};

import { HTMLAttributes } from 'react';

import { cn } from 'utils/lib/tailwind';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-ninja-300', className)} {...props} />;
}

export { Skeleton };

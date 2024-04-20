import { useState } from 'react';

import { RefreshCcw } from 'lucide-react';

import { Button } from 'components/ui/button';

import { useDevicesActions } from 'hooks';

import { cn } from 'utils/lib/tailwind';

export const ResetFilterButton = () => {
  const [isRotated, setIsRotated] = useState(false);
  const { resetDevicesInfo } = useDevicesActions();

  const toggleRotation = () => {
    resetDevicesInfo();
    setIsRotated(!isRotated);
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleRotation}
      className={cn(
        'transform',
        isRotated ? 'rotate-180' : 'rotate-0',
        'transition-transform duration-500 rounded-full w-9 h-9 p-0 ml-auto lg:order-last max-[1024px]:order-2 max-[1024px]:-mt-[52px]',
      )}
    >
      <RefreshCcw className="h-5 w-5" />
    </Button>
  );
};

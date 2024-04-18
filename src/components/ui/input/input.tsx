import * as React from 'react';

import Icon, { iconType } from 'components/ui/icon/icon';

import { cn } from 'utils/lib/tailwind';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: keyof typeof iconType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => (
    <div
      className="flex h-10 w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      data-testid="input-wrapper"
    >
      {icon && (
        <span className="flex-none mr-2 my-auto" data-testid="input-icon-wrapper">
          <Icon name={icon} color="#88859E" />
        </span>
      )}

      <input
        data-testid="input-element"
        type={type}
        className={cn(
          'flex-auto file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ninja-500 placeholder:text-sm placeholder:font-normal font-normal text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  ),
);
Input.displayName = 'Input';

export { Input };

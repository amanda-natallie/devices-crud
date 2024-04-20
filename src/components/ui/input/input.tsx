import * as React from 'react';

import Icon, { iconType } from 'components/ui/icon/icon';

import { cn } from 'utils/lib/tailwind';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: keyof typeof iconType;
  isValid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, isValid = true, type = 'text', ...props }, ref) => (
    <div className="w-full flex flex-col gap-1">
      <div
        className={cn(
          'flex h-10 w-full rounded border bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring',
          isValid
            ? 'border-input focus-within:ring-ring'
            : 'border-destructive focus-within:ring-destructive',
          className,
        )}
        data-testid="input-wrapper"
      >
        {icon && (
          <span className="flex-none mr-2 my-auto" data-testid="input-icon-wrapper">
            <Icon name={icon} color="#88859E" />
          </span>
        )}

        <input
          data-testid="input-element"
          className={cn(
            'flex-auto file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-sm placeholder:font-normal font-normal text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            isValid ? 'placeholder:text-ninja-500' : 'placeholder:text-destructive',
            className,
          )}
          ref={ref}
          type={type}
          {...props}
        />
      </div>
    </div>
  ),
);
Input.displayName = 'Input';

export { Input };

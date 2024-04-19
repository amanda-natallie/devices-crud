import { ReactNode } from 'react';

import { VariantProps } from 'class-variance-authority';

import { Button, buttonVariants } from 'components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog/dialog';

type ActionsProps = {
  label: string;
  onClick: () => void;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  className?: string;
};

export type ModalWrapperProps = {
  children: ReactNode;
  title: string;
  actions: {
    primary: Omit<ActionsProps, 'variant' | 'label'>;
    secondary: ActionsProps;
  };
};

function ModalWrapper({ actions, children, title }: ModalWrapperProps) {
  const { primary, secondary } = actions;
  return (
    <DialogContent className="sm:max-w-[320px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={primary.onClick}
          className={primary.className}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant={secondary.variant ?? 'default'}
          onClick={secondary.onClick}
          className={secondary.className}
        >
          {secondary.label}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default ModalWrapper;

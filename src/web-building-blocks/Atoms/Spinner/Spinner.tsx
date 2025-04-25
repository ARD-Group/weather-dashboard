import React from 'react';
import { cn } from '../../shadcnUI/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants>, VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  dataTestId?: string;
}

const Spinner = ({ size, show, children, className, dataTestId }: SpinnerProps) => {
  return (
    <span
      className={spinnerVariants({ show })}
      data-testid={`${dataTestId ? `${dataTestId}-` : ''}spinner`}
    >
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
};

export default Spinner;

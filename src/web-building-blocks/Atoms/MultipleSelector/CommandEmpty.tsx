import React, { forwardRef } from 'react';
import { cn } from '../../shadcnUI/lib/utils';
import { useCommandState } from 'cmdk';

const CommandEmpty = forwardRef<HTMLDivElement, Omit<React.ComponentProps<'div'>, 'className'> & { className?: string }>(
  (
    {
      className,
      ...props
    }: {
      className?: string;
      [key: string]: any;
    },
    forwardedRef,
  ) => {
    const render = useCommandState((state) => state.filtered.count === 0);

    if (!render) return null;

    return (
      <div
        ref={forwardedRef}
        className={cn('py-6 text-center text-sm', className)}
        role="presentation"
        {...props}
      />
    );
  },
);

CommandEmpty.displayName = 'CommandEmpty';
export default CommandEmpty;

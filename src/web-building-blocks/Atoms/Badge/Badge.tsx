import React from 'react';
import { Badge as ShadcnBadge } from '../../shadcnUI/components/ui/badge';
import ShowIf from '../ShowIf';
import { cn } from '../../shadcnUI/lib/utils';

interface BadgeClasses {
  root?: string;
  contentWrapper?: string;
}

export interface BadgeProps {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'secondary' | 'destructive';
  styleClasses?: BadgeClasses;
  dataTestId?: string;
}

const Badge = ({ children, startIcon, endIcon, variant = 'filled', styleClasses, dataTestId = 'badge' }: BadgeProps) => {
  return (
    <ShadcnBadge
      variant={variant}
      className={styleClasses?.root}
      data-testid={`${dataTestId}-root`}
    >
      <div
        className={cn('flex flex-nowrap items-center gap-[0.375rem]', styleClasses?.contentWrapper)}
        data-testid={`${dataTestId}-contentWrapper`}
      >
        <ShowIf
          If={!!startIcon}
          data-testid={`${dataTestId}-startIcon`}
        >
          {startIcon}
        </ShowIf>
        {children}
        <ShowIf
          If={!!endIcon}
          data-testid={`${dataTestId}-endIcon`}
        >
          {endIcon}
        </ShowIf>
      </div>
    </ShadcnBadge>
  );
};

export default Badge;

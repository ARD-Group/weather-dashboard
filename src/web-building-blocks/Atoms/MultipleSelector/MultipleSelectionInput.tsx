import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../shadcnUI/lib/utils';
import Badge from '../Badge';

import { Option } from './types';

const MultipleSelectionInput = ({
  selected,
  badgeClassName,
  dataTestId,
  disabled,
  onChipRemove,
  renderCustomLabel,
}: {
  selected: Option[];
  badgeClassName?: string;
  dataTestId?: string;
  disabled?: boolean;
  onChipRemove: (option: Option) => void;
  renderCustomLabel?: (option: Option) => React.ReactNode;
}): React.ReactElement => {
  return (
    <>
      {selected.map((option) => {
        return (
          <Badge
            key={option.value}
            styleClasses={{
              root: cn(
                'data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground',
                'data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground',
                badgeClassName,
              ),
            }}
            data-fixed={option.fixed}
            data-disabled={disabled || undefined}
            data-testid={`${dataTestId}-selected-badge-${option.label}`}
          >
            {renderCustomLabel?.(option) ?? option.label}
            <button
              className={cn(
                'ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2',
                (disabled || option.fixed) && 'hidden',
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onChipRemove(option);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => onChipRemove(option)}
            >
              <X className="text-muted hover:text-foreground h-4 w-4" />
            </button>
          </Badge>
        );
      })}
    </>
  );
};

export default MultipleSelectionInput;

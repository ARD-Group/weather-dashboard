import React from 'react';
import { CommandItem } from 'cmdk';
import CommandEmpty from './CommandEmpty';
import { GroupOption } from './types';

interface EmptyItemProps {
  children?: React.ReactNode;
  emptyIndicator?: React.ReactNode;
  onSearch?: (value: string) => Promise<any>;
  creatable: boolean;
  options: GroupOption;
  dataTestId: string;
}

const EmptyItem: React.FC<EmptyItemProps> = ({ children, emptyIndicator, onSearch, creatable, options, dataTestId }) => {
  if (!emptyIndicator && !children) return null;

  if (onSearch && !creatable && Object.keys(options).length === 0) {
    return (
      <CommandItem
        value="-"
        disabled
        data-testid={`${dataTestId}-empty-item`}
      >
        {emptyIndicator}
        {children}
      </CommandItem>
    );
  }

  return (
    <CommandEmpty
      data-testid={`${dataTestId}-empty-item`}
      className={children ? 'pb-0' : ''}
    >
      {emptyIndicator}
      {children}
    </CommandEmpty>
  );
};

export default EmptyItem;

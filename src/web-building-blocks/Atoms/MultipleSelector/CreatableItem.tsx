import React from 'react';
import { Plus } from 'lucide-react';

import Button from '../Button';

import { cn } from '../../shadcnUI/lib/utils';
import { Option } from './types';

interface CreatableItemProps {
  dataTestId?: string;
  onAddClick?: (val: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  selected: Option[];
  setSelected: (value: Option[]) => void;
  onChange?: (value: Option[]) => void;
  setOpen: (open: boolean) => void;
  isAddLoading?: boolean;
}

const CreatableItem: React.FC<CreatableItemProps> = ({
  dataTestId,
  onAddClick,
  inputValue,
  setInputValue,
  selected,
  setSelected,
  onChange,
  setOpen,
  isAddLoading,
}) => {
  return (
    <Button
      dataTestId={`${dataTestId}-add-button`}
      variant="outline"
      type="button"
      className={cn('flex h-fit w-full justify-start border-none p-0 p-2 text-xs')}
      onClick={async () => {
        await onAddClick?.(inputValue);
        const newOptions = [...selected, { value: inputValue, label: inputValue }];
        await onChange?.(newOptions);
        setInputValue('');
        setSelected(newOptions);
        setOpen(false);
      }}
      disabled={!inputValue || isAddLoading}
    >
      {isAddLoading ? (
        'Loading...'
      ) : (
        <>
          <Plus className="!h-3 !w-3" />
          Add new
        </>
      )}
    </Button>
  );
};

export default CreatableItem;

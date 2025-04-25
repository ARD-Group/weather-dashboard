import { Loader2 } from 'lucide-react';

import DebouncedInput, { DebouncedInputProps } from '../../Molecules/DebouncedInput/DebouncedInput';
import { cn } from '../../shadcnUI/lib/utils';
import { getS3Path } from '../../utils';

type SearchInputProps = Omit<DebouncedInputProps, 'value'>;

const SearchInput = ({ isLoading, ...props }: SearchInputProps) => {
  return (
    <div className={cn('border-neutral2 bg-neutral0 outline-neutral9 relative ml-auto w-full flex-1 rounded-lg ps-9 shadow md:grow-0')}>
      <img
        src={getS3Path('/icons/search-01.svg')}
        alt="search-icon"
        className={cn('text-muted-foreground absolute start-[0.8125rem] top-[0.625rem] h-5 w-5')}
      />
      <DebouncedInput
        styleClasses={{
          root: cn('h-10 w-full max-w-full'),
          input: cn('border-none bg-transparent outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'),
        }}
        type="text"
        placeholder="Search"
        {...props}
      />
      <div className={cn('absolute inset-y-0 right-0 flex items-center pr-3')}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}</div>
    </div>
  );
};

export default SearchInput;

import React, { forwardRef } from 'react';
import { useDebouncing } from './hooks';
import Input, { InputProps } from '../../Atoms/Input/Input';
type PickedInputProps = Omit<InputProps, 'onChange'>;
export interface DebouncedInputProps extends PickedInputProps {
  initialValue?: string;
  onChange: (value: string) => void;
  /* Debounce delay in milliseconds */
  delay?: number;
  value?: string;
  setIsLoading?: (isLoading: boolean) => void;
}

/**
 * DebouncedInput component
 * @example
 * <DebouncedInput
 *  initialValue={value}
 *  onChange={handleDebouncedChange}
 *  delay={5000}
 *  placeholder="Search for ..."
 * />
 */
const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  ({ initialValue = '', value, onChange, setIsLoading, delay = 1000, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<string>(initialValue);
    const { debouncedValue, isLoading } = useDebouncing(inputValue, delay);

    React.useEffect(() => {
      setInputValue(value ?? '');
    }, [value]);

    React.useEffect(() => {
      setIsLoading?.(isLoading);
    }, [isLoading, setIsLoading]);

    React.useEffect(() => {
      onChange(debouncedValue);
    }, [debouncedValue, onChange]);

    const handleChange = (value: string) => {
      setInputValue(value);
    };

    return (
      <Input
        ref={ref}
        type="text"
        value={inputValue}
        onChangeHandler={handleChange}
        {...props}
      />
    );
  },
);

DebouncedInput.displayName = 'DebouncedInput';

export default DebouncedInput;

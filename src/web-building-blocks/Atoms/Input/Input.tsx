import { forwardRef, useState } from 'react';
import { Input as ShadcnInput } from '../../shadcnUI/components/ui/input';
import ShowIf from '../ShowIf';
import { cn } from '../../shadcnUI/lib/utils';
import Typography from '../Typography';

type StyleClasses = {
  root?: string;
  label?: string;
  input?: string;
  error?: string;
  prefixWrapper?: string;
  postfixWrapper?: string;
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The label of the input */
  label?: string;
  /** The current error message of the input */
  error?: string;
  /** The type of the input */
  type?: string;
  /** The id of the input */
  inputId?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** The data-testid of the input */
  dataTestId?: string;
  /** The onChange handler of the input */
  onChangeHandler?: (value: string) => void;
  /** The style of the input
   * @deprecated
   */
  inputStyles?: StyleClasses;
  styleClasses?: StyleClasses;
  placeholder?: string;
  isOptional?: boolean;
  isLoading?: boolean;
  /** The prefix (e.g., "$", "%" etc.) to display inside the input */
  prefix?: string;
  /** The postfix (e.g., "KM", "%" etc.) to display inside the input */
  postfix?: string;
}

/** An `Input component`
 * @example
 * <Input
 *  label="Distance"
 *  type="number"
 *  inputId="distance"
 *  placeholder="Enter your distance"
 *  prefix="$"
 *  postfix="KM"
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = 'text',
      inputId,
      isLoading = false,
      disabled,
      isOptional,
      onChangeHandler,
      dataTestId = 'input',
      inputStyles,
      styleClasses,
      placeholder,
      prefix,
      postfix,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>();

    const internalInputId = inputId ?? label;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChangeHandler?.(e.target.value);
    };

    return (
      <div
        className={cn('flex w-full max-w-sm flex-col gap-1.5', inputStyles?.root, styleClasses?.root)}
        data-testid={`${dataTestId}-root`}
      >
        <ShowIf If={!!label}>
          <label
            className={cn('text-primary flex items-center gap-1 text-sm capitalize', inputStyles?.label, styleClasses?.label)}
            data-testid={`${dataTestId}-label`}
            htmlFor={internalInputId ?? ''}
          >
            {label}
            {isOptional && (
              <Typography
                variant="caption1"
                className={cn('text-neutral4')}
              >
                (Optional)
              </Typography>
            )}
          </label>
        </ShowIf>
        <div
          className={cn(
            'focus-within:ring-primary bg-background focus-within:border-primary items-center justify-center p-0',
            'border-input ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            inputStyles?.input,
            styleClasses?.input,
          )}
          data-testid={`${dataTestId}-wrapper`}
        >
          {prefix && (
            <div
              className={cn(
                'text-neutral6 bg-neutral1 me-1 flex h-full items-center justify-center rounded-s-md px-3 text-sm',
                styleClasses?.prefixWrapper,
              )}
            >
              {prefix}
            </div>
          )}
          <ShadcnInput
            placeholder={placeholder}
            className={cn('focus:none h-full w-full border-none bg-inherit focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0')}
            value={value}
            disabled={disabled || isLoading}
            onChange={onChange}
            data-testid={`${dataTestId}-field`}
            id={internalInputId}
            type={type}
            ref={ref}
            {...props}
          />
          {postfix && (
            <div
              className={cn(
                'text-neutral6 bg-neutral1 ms-1 flex h-full items-center justify-center rounded-e-md px-3 text-sm',
                styleClasses?.postfixWrapper,
              )}
            >
              {postfix}
            </div>
          )}
        </div>

        <ShowIf If={isLoading}>
          <label
            className={cn('text-neutral3 flex justify-start text-xs')}
            data-testid={`${dataTestId}-loading`}
            htmlFor={internalInputId ?? ''}
          >
            Loading...
          </label>
        </ShowIf>
        <ShowIf If={!!error}>
          <label
            className={cn('text-negative5 text-sm', styleClasses?.error)}
            data-testid={`${dataTestId}-error`}
            htmlFor={internalInputId ?? ''}
          >
            {error}
          </label>
        </ShowIf>
      </div>
    );
  },
);
Input.displayName = 'Input';
export default Input;

import { Switch as ShadcnSwitch } from '../../shadcnUI/components/ui/switch';
import { cn } from '../../shadcnUI/lib/utils';

export interface switchStylesTypes {
  root?: string;
  /* Custom styles for the switch use for checked State use prefix `data-[state=checked]:`
   , unchecked State use prefix `data-[state=unchecked]:` */
  switch?: string;
  label?: string;
}

export interface SwitchProps {
  /* If true, the switch will be disabled */
  disabled?: boolean;
  styleClasses?: switchStylesTypes;
  /* Data test id */
  dataTestId?: string;
  /* Label for the switch */
  label: string;
  /* Unique id for the switch */
  switchId?: string;
  /* Default checked value for the switch */
  defaultChecked?: boolean;
  /* Function to call when the switch is checked */
  onCheckedChange: (checked: boolean) => void;
  /* Checked value for the switch */
  checked?: boolean;
}

/**
 * Switch component is used to toggle between two states.
 * @example
 * <Switch
 *  styleClasses={{
 *    root: "bg-red-500",
 *    switch: "bg-blue-500",
 *    label: "text-white",
 *  }}
 *  label="Switch"
 *  switchId="switch-1"
 *  value={true}
 *  onCheckedChange={(checked) => console.log(checked)}
 * />
 */
const Switch = ({
  disabled = false,
  styleClasses,
  dataTestId = 'switch',
  label,
  switchId,
  defaultChecked = false,
  onCheckedChange,
  checked,
}: SwitchProps) => {
  const internalSwitchId = switchId ?? label;

  return (
    <div
      data-testid={`${dataTestId}-root`}
      className={cn('flex items-center space-x-2', styleClasses?.root)}
    >
      <ShadcnSwitch
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        id={internalSwitchId}
        disabled={disabled}
        data-testid={`${dataTestId}-input`}
        className={cn(styleClasses?.switch)}
      />
      <label
        htmlFor={internalSwitchId}
        data-testid={`${dataTestId}-label`}
        className={cn(styleClasses?.label)}
      >
        {label}
      </label>
    </div>
  );
};

export default Switch;

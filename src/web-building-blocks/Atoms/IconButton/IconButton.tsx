import Button, { ButtonProps } from '../Button';

type PickedButtonProps = Omit<ButtonProps, 'buttonStyle'>;
export interface IconButtonProps extends PickedButtonProps {
  iconButtonStyle?: string;
}

const IconButton = ({ children, size = 'icon', variant, iconButtonStyle, dataTestId = 'icon-button', ...props }: IconButtonProps) => {
  return (
    <Button
      dataTestId={dataTestId}
      buttonStyle={iconButtonStyle}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;

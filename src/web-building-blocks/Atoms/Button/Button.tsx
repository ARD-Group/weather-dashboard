import { Button as ButtonShadcn, ButtonProps as ShadcnButtonProps } from '../../shadcnUI/components/ui/button';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ShadcnButtonProps {
  children: React.ReactNode[] | React.ReactNode | string;
  buttonStyle?: string;
  dataTestId?: string;
}

const Button = ({ children, dataTestId = 'button', buttonStyle, ...props }: ButtonProps) => {
  return (
    <ButtonShadcn
      data-testid={dataTestId}
      className={buttonStyle}
      {...props}
    >
      {children}
    </ButtonShadcn>
  );
};

export default Button;

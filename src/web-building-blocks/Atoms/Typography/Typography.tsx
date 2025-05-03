import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../shadcnUI/lib/utils";

export type TypographyVariants =
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "title5"
  | "subtitle1"
  | "subtitle2"
  | "subtitle2-strong"
  | "body2"
  | "body1-stronger"
  | "body1-strong"
  | "body1"
  | "caption1-stronger"
  | "caption1-strong"
  | "caption1"
  | "caption2"
  | "caption2-strong";

const typographyVariants = cva("", {
  variants: {
    variant: {
      title1: "font-poppins text-[96px] font-bold leading-normal",
      title2: "text-[80px] font-bold font-Poppins leading-normal",
      title3: " font-poppins text-3xl font-bold leading-normal",
      title4:
        "text-[20px] font-bold leading-normal   font-Poppins",
      title5: "text-[32px] font-bold leading-normal   font-Poppins",
      subtitle1:
        "text-[18px] flex flex-col justify-center flex-shrink-0",
      "subtitle1-strong":
        "text-[20px] font-bold leading-normal  font-Poppins",
      subtitle2: "text-[20px] font-bold leading-normal  font-Poppins",
      "subtitle2-strong":
        "text-[24px] font-bold leading-normal  font-['Poppins']",
      body2: "font-poppins text-[20px] font-normal leading-normal text-search-text",
      "body1-stronger": "text-sm leading-5 font-black",
      "body1-strong": "text-sm leading-5 font-semibold",
      body1: "text-[20px] font-semibold leading-normal  font-['Poppins']",
      "caption1-stronger": "text-xs leading-4 font-black",
      "caption1-strong": "text-xs leading-4 font-semibold",
      caption1: "text-[16px]  leading-normal   font-Poppins",
      "caption2-strong": "text-[0.625rem] leading-[0.875rem] font-semibold",
      caption2: "text-[0.625rem] leading-[0.875rem] font-normal",
    },
  },
});

const variantToTag: Record<TypographyVariants, string> = {
  title1: "h1",
  title2: "h2",
  title3: "h3",
  title4: "h4",
  title5: "h5",
  subtitle1: "p",
  subtitle2: "p",
  "subtitle2-strong": "p",
  body2: "p",
  "body1-stronger": "p",
  "body1-strong": "p",
  body1: "p",
  "caption1-stronger": "p",
  "caption1-strong": "p",
  caption1: "p",
  "caption2-strong": "p",
  caption2: "p",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariants;
  children: React.ReactNode;
  /** @deprecated use className instead */
  typographyStyle?: string;
  as?: string;
  asChild?: boolean;
  dataTestId?: string;
  /** @deprecated use skeleton component instead */
  isLoading?: boolean;
  skeletonClasses?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "body1",
      children,
      typographyStyle,
      as = undefined,
      asChild = false,
      isLoading,
      skeletonClasses,
      dataTestId = "typography",
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : (as ?? variantToTag[variant]);

    if (isLoading) {
      return (
        <div className={cn("animate-pulse")}>
          <Comp
            className={cn(
              "mb-4 h-3 w-48 rounded-full bg-gray-300",
              typographyVariants({
                variant: "caption1",
                className: skeletonClasses,
              })
            )}
            data-testid={`${dataTestId}-loading`}
          >
            &nbsp;
          </Comp>
        </div>
      );
    }

    return (
      <Comp
        className={cn(
          typographyVariants({
            variant,
            className: className || typographyStyle,
          })
        )}
        ref={ref}
        data-testid={`${dataTestId}-${variant}`}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;

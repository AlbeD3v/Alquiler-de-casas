import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-sol text-noche hover:bg-sol/90 shadow-md hover:shadow-lg",
        secondary:
          "bg-noche text-arena hover:bg-noche/90 shadow-md hover:shadow-lg",
        outline:
          "border-2 border-noche/30 bg-transparent text-noche hover:bg-noche/5 hover:border-sol",
        ghost: "text-noche hover:bg-noche/5 hover:text-sol",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-sol underline-offset-4 hover:underline",
        golden:
          "bg-gradient-to-r from-sol to-oro text-noche hover:from-sol/90 hover:to-oro/90 shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

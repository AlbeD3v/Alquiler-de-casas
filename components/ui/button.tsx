import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none',
  {
    variants: {
      variant: {
        default:
          'bg-sol text-noche hover:bg-sol/90 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-tinted)]',
        secondary:
          'bg-noche text-arena hover:bg-noche/90 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-surface-container-low hover:border-sol/50',
        ghost:
          'text-foreground hover:bg-surface-container-low hover:text-sol',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[var(--shadow-card)]',
        link:
          'text-sol underline-offset-4 hover:underline p-0 h-auto',
        golden:
          'bg-gradient-to-r from-sol to-oro text-noche font-semibold shadow-[var(--shadow-tinted)] hover:shadow-[var(--shadow-card-hover)] hover:brightness-105',
        premium:
          'bg-gradient-to-r from-oro via-sol to-oro bg-[length:200%] text-noche font-semibold shadow-[var(--shadow-tinted)] hover:bg-right transition-all duration-500',
        caribe:
          'bg-caribe text-white hover:bg-caribe/90 shadow-[var(--shadow-card)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 px-8 text-base rounded-xl',
        xl: 'h-14 px-10 text-lg rounded-xl',
        icon: 'h-10 w-10 rounded-lg',
        'icon-sm': 'h-8 w-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

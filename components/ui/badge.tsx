import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-primary/20',
        secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
        outline: 'border border-border text-foreground bg-transparent',
        destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
        success: 'bg-success/10 text-success border border-success/20',
        warning: 'bg-warning/10 text-warning-foreground border border-warning/20',
        premium: 'bg-gradient-to-r from-oro to-sol text-noche border-0 shadow-sm',
        verified: 'bg-caribe/10 text-caribe border border-caribe/20',
        nuevo: 'bg-palma/10 text-palma border border-palma/20',
        oferta: 'bg-coral/10 text-coral border border-coral/20',
        destacado: 'bg-sol/10 text-sol border border-sol/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

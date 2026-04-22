import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { User, CheckCircle2 } from 'lucide-react'

const avatarVariants = cva(
  'relative inline-flex shrink-0 overflow-hidden rounded-full bg-surface-container-high',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-24 w-24',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

const fallbackSizeMap = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  default: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-12 w-12',
}

const badgeSizeMap = {
  xs: 'h-2 w-2 -bottom-0 -right-0',
  sm: 'h-2.5 w-2.5 -bottom-0 -right-0',
  default: 'h-3.5 w-3.5 bottom-0 right-0',
  lg: 'h-4 w-4 bottom-0 right-0',
  xl: 'h-5 w-5 bottom-0.5 right-0.5',
  '2xl': 'h-7 w-7 bottom-1 right-1',
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  verified?: boolean
}

function Avatar({ className, size = 'default', src, alt, fallback, verified, ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)
  const iconSize = fallbackSizeMap[size ?? 'default']
  const badgeSize = badgeSizeMap[size ?? 'default']

  return (
    <div className={cn(avatarVariants({ size }), 'ring-2 ring-border/20', className)} {...props}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt ?? 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : fallback ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sol/20 to-oro/20 text-noche font-semibold text-sm">
          {fallback.slice(0, 2).toUpperCase()}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sol/10 to-oro/10">
          <User className={cn(iconSize, 'text-muted-foreground')} />
        </div>
      )}
      {verified && (
        <span className={cn('absolute z-10', badgeSize)}>
          <CheckCircle2 className="h-full w-full fill-caribe text-white" />
        </span>
      )}
    </div>
  )
}

export { Avatar, avatarVariants }

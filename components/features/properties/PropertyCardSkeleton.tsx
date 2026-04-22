import { cn } from '@/lib/utils'

interface PropertyCardSkeletonProps {
  className?: string
  variant?: 'card' | 'list'
}

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-surface-container-high',
        className
      )}
    />
  )
}

export function PropertyCardSkeleton({ className, variant = 'card' }: PropertyCardSkeletonProps) {
  if (variant === 'list') {
    return (
      <div
        className={cn(
          'flex gap-4 rounded-2xl bg-surface-container-lowest p-4 shadow-card',
          className
        )}
      >
        <Pulse className="h-28 w-40 shrink-0 rounded-xl" />
        <div className="flex flex-1 flex-col justify-between py-1">
          <div className="space-y-2">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-1/2" />
          </div>
          <div className="space-y-2">
            <Pulse className="h-3 w-full" />
            <div className="flex gap-3">
              <Pulse className="h-3 w-16" />
              <Pulse className="h-3 w-16" />
              <Pulse className="h-3 w-16" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Pulse className="h-5 w-24" />
            <Pulse className="h-8 w-20 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl bg-surface-container-lowest shadow-card',
        className
      )}
    >
      <Pulse className="h-52 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Pulse className="h-5 w-2/3" />
          <Pulse className="h-5 w-16 rounded-full" />
        </div>
        <Pulse className="h-3 w-1/2" />
        <div className="flex gap-3 pt-1">
          <Pulse className="h-3 w-14" />
          <Pulse className="h-3 w-14" />
          <Pulse className="h-3 w-14" />
        </div>
        <div className="pt-2 flex items-center justify-between border-t border-border/30">
          <Pulse className="h-6 w-28" />
          <Pulse className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function PropertyCardSkeletonGrid({
  count = 6,
  columns = 3,
}: {
  count?: number
  columns?: 1 | 2 | 3
}) {
  const gridCols = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  const skeletonVariant = columns === 1 ? 'list' : 'card'

  return (
    <div className={cn('grid gap-5', gridCols)}>
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} variant={skeletonVariant} />
      ))}
    </div>
  )
}

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide transition-colors focus:outline-none select-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/20 text-primary border-primary/30',
        secondary:
          'border-border bg-surface-raised text-secondary-foreground',
        outline: 'border-border text-muted-foreground',
        destructive:
          'border-red-500/25 bg-red-50 text-red-700',
        'risk-low':
          'border-emerald-500/25 bg-emerald-50 text-emerald-700 font-semibold',
        'risk-moderate':
          'border-amber-500/25 bg-amber-50 text-amber-700 font-semibold',
        'risk-high':
          'border-orange-500/25 bg-orange-50 text-orange-700 font-semibold',
        'risk-critical':
          'border-red-500/30 bg-red-50 text-red-700 font-bold animate-pulse-subtle',
        xp:
          'border-amber-500/25 bg-amber-50 text-amber-700 font-bold',
        streak:
          'border-orange-500/25 bg-orange-50 text-orange-700 font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

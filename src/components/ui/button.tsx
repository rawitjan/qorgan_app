import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_8px_18px_-12px_rgba(8,127,91,0.8)] hover:bg-primary-hover',
        secondary:
          'bg-surface-raised text-secondary-foreground border border-border hover:bg-muted hover:text-foreground',
        destructive:
          'bg-red-500/15 text-red-400 border border-red-500/40 hover:bg-red-500/25',
        outline:
          'border border-border bg-surface text-foreground hover:bg-surface-raised hover:border-primary/25',
        ghost:
          'hover:bg-surface hover:text-foreground text-muted-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        junior:
          'bg-primary text-white font-bold shadow-sm hover:bg-primary-hover rounded-xl',
        sos:
          'bg-red-600 text-white font-bold shadow-[0_0_20px_-3px_rgba(239,68,68,0.5)] hover:bg-red-500 border border-red-400/50',
      },
      size: {
        default: 'h-11 px-4 py-2 text-sm',
        sm: 'h-9 rounded-xl px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

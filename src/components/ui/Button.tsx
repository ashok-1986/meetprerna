'use client';

import { forwardRef, type ElementRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-center font-medium transition-all duration-260 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary:
          'bg-inchworm text-ink hover:bg-inchworm-deep active:bg-inchworm-deep',
        secondary:
          'border border-ink-20 text-ivory hover:bg-ink-70 active:bg-ink-70',
        ghost:
          'text-ivory-dim hover:text-ivory hover:bg-ink-70 active:bg-ink-70',
        outline:
          'border border-ivory/20 text-ivory hover:bg-ivory/5 active:bg-ivory/10',
        link:
          'text-inchworm underline-offset-2 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-body-sm',
        md: 'h-10 px-5 text-body',
        lg: 'h-12 px-7 text-body-lg',
        xl: 'h-14 px-9 text-body-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav';
  narrow?: boolean;
}>(
  ({ as: Tag = 'div', narrow = false, className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'mx-auto w-full px-gutter',
          narrow ? 'max-w-[var(--content-narrow)]' : 'max-w-[var(--content-wide)]',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Container.displayName = 'Container';

export default Container;

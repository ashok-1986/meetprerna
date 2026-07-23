import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const sectionVariants = cva(
  'w-full',
  {
    variants: {
      spacing: {
        default: 'py-24',
        hero: 'pt-32 pb-24 md:pt-48 md:pb-32',
        section: 'py-24 md:py-32',
        none: '',
      },
      tone: {
        default: 'bg-transparent',
        warm: 'bg-ink-primary',
      },
    },
    defaultVariants: {
      spacing: 'default',
      tone: 'default',
    },
  }
);

export interface SectionProps
  extends ComponentPropsWithoutRef<'section'>,
    VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'article' | 'header' | 'footer';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Tag = 'section', className, spacing, tone, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as any}
        className={cn(sectionVariants({ spacing, tone }), className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Section.displayName = 'Section';

export default Section;

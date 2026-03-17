import { cn } from '@/lib/tokens';

interface SectionEyebrowProps {
  text: string;
  className?: string;
  color?: 'green' | 'ivory' | 'muted';
}

/**
 * Section Eyebrow Component
 * Small uppercase label text used above section headings
 */
export function SectionEyebrow({
  text,
  className = '',
  color = 'green',
}: SectionEyebrowProps) {
  const colorClasses = {
    green: 'text-green',
    ivory: 'text-ivory',
    muted: 'text-muted',
  };

  return (
    <p
      className={cn(
        'text-xs md:text-sm uppercase tracking-[0.2em] mb-4',
        colorClasses[color],
        className
      )}
    >
      {text}
    </p>
  );
}

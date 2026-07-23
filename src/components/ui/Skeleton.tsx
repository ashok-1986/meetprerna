import { cn } from '@/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export function Skeleton({
  className,
  width,
  height,
  circle = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-ink-secondary',
        circle ? 'rounded-full' : 'rounded-sm',
        className
      )}
      style={{
        width: width ?? undefined,
        height: height ?? undefined,
      }}
      {...props}
    />
  );
}

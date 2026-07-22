import Image, { type ImageProps } from 'next/image';
import { cn } from '@/utils/cn';

export interface RevealImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string | null;
  alt?: string | null;
  aspect?: string;
  caption?: string;
  containerClassName?: string;
}

export default function RevealImage({
  src,
  alt,
  aspect,
  caption,
  containerClassName,
  className,
  priority,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: RevealImageProps) {
  // Static placeholder fallback if no src is provided
  const imageSrc = src || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  return (
    <figure className={cn('flex flex-col gap-3', containerClassName)}>
      <div
        className={cn('relative w-full overflow-hidden bg-ink-70 rounded-sm', !aspect && 'aspect-square')}
        style={aspect ? { aspectRatio: aspect } : undefined}
      >
        <Image
          src={imageSrc}
          alt={alt || ''}
          fill
          priority={priority}
          sizes={sizes}
          className={cn('object-cover', className)}
          {...props}
        />
      </div>
      {caption && (
        <figcaption className="text-body-sm text-ivory-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

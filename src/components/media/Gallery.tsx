'use client';

import { useState } from 'react';
import { type PortfolioItem } from '@/types/content';
import { cn } from '@/utils/cn';
import GalleryItem from './GalleryItem';
import GalleryDialog from './GalleryDialog';

interface GalleryProps {
  items: PortfolioItem[];
  columns?: 2 | 3 | 4;
  variant: 'tattoo' | 'painting' | 'sketch';
  className?: string;
}

export default function Gallery({ items, columns = 3, variant, className }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <>
      <div className={cn('grid grid-cols-1 gap-4', gridColsClass, className)}>
        {items.map((item, index) => (
          <GalleryItem
            key={item._id}
            item={item}
            index={index}
            variant={variant}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      <GalleryDialog
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        related={items}
      />
    </>
  );
}

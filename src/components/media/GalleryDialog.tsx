'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { type PortfolioItem } from '@/types/content';
import { urlFor } from '@/lib/sanity/image';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ease, dur } from '@/animations/easing';

interface GalleryDialogProps {
  item: PortfolioItem | null;
  onClose: () => void;
  related?: PortfolioItem[];
}

export default function GalleryDialog({ item, onClose, related }: GalleryDialogProps) {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenedRef = useRef(false);

  // Sync prop item to state
  useEffect(() => {
    if (item && !activeItem) {
      setActiveItem(item);
    }
  }, [item, activeItem]);

  const triggerClose = useCallback(() => {
    if (!activeItem) return;

    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (prefersReducedMotion) {
      gsap.to([overlayRef.current, contentRef.current], {
        opacity: 0,
        duration: dur.d120,
        onComplete: () => {
          setActiveItem(null);
          onClose();
        },
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveItem(null);
        onClose();
      },
    });

    // Reverse of open
    // Metadata: opacity 1 -> 0, y 0 -> 16
    tl.to(
      metaRef.current,
      { opacity: 0, y: 16, duration: dur.d260, ease: ease.studio },
      0
    );
    // Content: opacity 1 -> 0, scale 1 -> 0.96
    tl.to(
      contentRef.current,
      { opacity: 0, scale: 0.96, duration: dur.d260, ease: ease.studio },
      0
    );
    // Overlay: opacity 1 -> 0
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: dur.d260, ease: ease.studio },
      0
    );
  }, [activeItem, onClose, prefersReducedMotion]);

  useGsapContext(() => {
    if (activeItem && !isOpenedRef.current) {
      isOpenedRef.current = true;
      const tl = gsap.timeline();
      tlRef.current = tl;

      if (prefersReducedMotion) {
        tl.fromTo(
          [overlayRef.current, contentRef.current],
          { opacity: 0 },
          { opacity: 1, duration: dur.d120 }
        );
        gsap.set(metaRef.current, { opacity: 1, y: 0 });
      } else {
        // Overlay: opacity: 0 -> 1, 260ms ease.studio
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: dur.d260, ease: ease.studio },
          0
        );

        // Content: opacity: 0 -> 1, scale: 0.96 -> 1, 420ms ease.editorial
        tl.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.96, willChange: 'transform, opacity' },
          {
            opacity: 1,
            scale: 1,
            duration: dur.d420,
            ease: ease.editorial,
            clearProps: 'willChange,scale',
          },
          0
        );

        // Metadata panel: opacity: 0, y: 16 -> opacity: 1, y: 0, 420ms ease.editorial, delay 0.12s
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 16, willChange: 'transform, opacity' },
          {
            opacity: 1,
            y: 0,
            duration: dur.d420,
            ease: ease.editorial,
            clearProps: 'willChange,transform',
          },
          0.12
        );
      }
      return { timeline: tl, kill: () => tl.kill() };
    }
    return () => {}; // return empty cleanup function if no activeItem
  }, [activeItem, prefersReducedMotion]);

  useEffect(() => {
    if (!activeItem) {
      isOpenedRef.current = false;
    }
  }, [activeItem]);

  const switchItem = useCallback(
    (nextItem: PortfolioItem) => {
      if (prefersReducedMotion) {
        setActiveItem(nextItem);
        return;
      }

      gsap.to(imageContainerRef.current, {
        opacity: 0,
        duration: 0.13,
        ease: ease.soft,
        onComplete: () => {
          setActiveItem(nextItem);
          gsap.to(imageContainerRef.current, {
            opacity: 1,
            duration: 0.13,
            ease: ease.soft,
          });
        },
      });
    },
    [prefersReducedMotion]
  );

  const handleNext = useCallback(() => {
    if (!activeItem || !related?.length) return;
    const currentIndex = related.findIndex((r) => r._id === activeItem._id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % related.length;
    const nextItem = related[nextIndex];
    if (nextItem) switchItem(nextItem);
  }, [activeItem, related, switchItem]);

  const handlePrev = useCallback(() => {
    if (!activeItem || !related?.length) return;
    const currentIndex = related.findIndex((r) => r._id === activeItem._id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + related.length) % related.length;
    const prevItem = related[prevIndex];
    if (prevItem) switchItem(prevItem);
  }, [activeItem, related, switchItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, handleNext, handlePrev]);

  if (!activeItem) return null;

  const heroImage =
    activeItem.images?.find((img) => img.isHero) || activeItem.images?.[0];
  const imgSrc = heroImage
    ? urlFor(heroImage).width(1200).auto('format').url()
    : undefined;

  return (
    <Dialog.Root open={!!activeItem} onOpenChange={(open) => !open && triggerClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          ref={overlayRef}
          style={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-ink/95 backdrop-blur-sm"
        />
        <Dialog.Content
          ref={contentRef}
          style={{ opacity: 0 }}
          className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 outline-none"
        >
          <div className="relative flex h-full w-full max-w-[var(--content-wide)] flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <Dialog.Close
              className="absolute right-0 top-0 lg:-top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink-80 text-ivory transition-colors hover:bg-ink-70 focus:outline-none focus:ring-2 focus:ring-inchworm"
              aria-label="Close dialog"
            >
              <X size={20} strokeWidth={1.5} />
            </Dialog.Close>

            <div
              ref={imageContainerRef}
              className="flex-1 flex items-center justify-center h-full max-h-[80vh] w-full"
            >
              {imgSrc ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={heroImage?.alt || activeItem.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-ink-70 rounded-sm flex items-center justify-center">
                  <span className="text-body text-ivory-dim">No Image</span>
                </div>
              )}
            </div>

            <div
              ref={metaRef}
              style={{ opacity: 0 }}
              className="flex flex-col gap-6 lg:w-96 shrink-0 bg-ink p-6 rounded-sm"
            >
              <div className="flex flex-col gap-2 border-b border-ink-20 pb-6">
                <Dialog.Title className="font-display text-h3 text-ivory">
                  {activeItem.title}
                </Dialog.Title>
                <Dialog.Description className="text-body-lg text-ivory-dim">
                  {activeItem.year}
                </Dialog.Description>
              </div>

              <div className="flex flex-col gap-4 text-body-sm text-ivory-dim">
                {activeItem.medium && (
                  <div className="flex justify-between border-b border-ink-20 pb-4">
                    <span>Medium</span>
                    <span className="text-ivory text-right">
                      {activeItem.medium}
                    </span>
                  </div>
                )}
                {activeItem.dimensions && (
                  <div className="flex justify-between border-b border-ink-20 pb-4">
                    <span>Dimensions</span>
                    <span className="text-ivory text-right">
                      {activeItem.dimensions}
                    </span>
                  </div>
                )}
                {activeItem.status && (
                  <div className="flex justify-between border-b border-ink-20 pb-4">
                    <span>Status</span>
                    <span className="text-ivory capitalize text-right">
                      {activeItem.status}
                    </span>
                  </div>
                )}
                {activeItem.bodyArea && (
                  <div className="flex justify-between border-b border-ink-20 pb-4">
                    <span>Placement</span>
                    <span className="text-ivory text-right">
                      {activeItem.bodyArea}
                    </span>
                  </div>
                )}
              </div>

              {activeItem.note && (
                <div className="pt-4 text-body text-ivory leading-relaxed font-serif italic">
                  {activeItem.note}
                </div>
              )}

              {related && related.length > 1 && (
                <div className="flex gap-4 pt-8">
                  <button
                    onClick={handlePrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-20 text-ivory transition-colors hover:bg-ink-80"
                    aria-label="Previous item"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-20 text-ivory transition-colors hover:bg-ink-80"
                    aria-label="Next item"
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

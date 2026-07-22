/**
 * cn — Tailwind class merge utility.
 * Combines clsx + tailwind-merge.
 * Reference: docs/components.md §0.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
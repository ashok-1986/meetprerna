import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

/*
 * Unified CTA, ported from magicui's interactive-hover-button and
 * rebuilt to this project's own tokens and rules:
 * - Resting state is solid --color-inchworm fill / --color-ink text,
 *   not an outline. A filled button is self-contained and safe on any
 *   page background; an outline with lime text/border would fail
 *   DESIGN.md §9 if it ever landed on a light-themed section.
 * - Only transform and opacity are animated (no transition-all —
 *   banned outright, DESIGN.md §10).
 * - prefers-reduced-motion keeps the hover state functional (colors
 *   still swap) but removes the animated reveal, matching every other
 *   hover treatment already in this codebase.
 * - Renders as a Next.js Link when href is given, a <button> otherwise.
 */

const BASE_CLASSES = cn(
  'group relative inline-flex w-auto items-center justify-center overflow-hidden rounded-full',
  'bg-[var(--color-inchworm)] px-6 py-2.5 text-center font-medium text-[var(--color-ink)]',
  'min-h-[44px] cursor-pointer select-none',
  'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--color-focus)]'
)

function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="flex items-center justify-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            'h-2 w-2 rounded-full bg-[var(--color-ink)]',
            'transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
            'group-hover:scale-[60] group-focus-visible:scale-[60]',
            'motion-reduce:transition-none'
          )}
        />
        <span
          className={cn(
            'inline-block transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
            'group-hover:translate-x-8 group-hover:opacity-0',
            'group-focus-visible:translate-x-8 group-focus-visible:opacity-0',
            'motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:opacity-100'
          )}
        >
          {children}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-10 flex translate-x-8 items-center justify-center gap-2 opacity-0',
          'text-[var(--color-inchworm)]',
          'transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
          'group-hover:translate-x-0 group-hover:opacity-100',
          'group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
          'motion-reduce:hidden'
        )}
      >
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </>
  )
}

interface CommonProps {
  children: ReactNode
  className?: string
}

type LinkVariantProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonVariantProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

export type InteractiveHoverButtonProps = LinkVariantProps | ButtonVariantProps

export function InteractiveHoverButton({ children, className, href, ...props }: InteractiveHoverButtonProps) {
  const classes = cn(BASE_CLASSES, className)

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <ButtonContent>{children}</ButtonContent>
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <ButtonContent>{children}</ButtonContent>
    </button>
  )
}

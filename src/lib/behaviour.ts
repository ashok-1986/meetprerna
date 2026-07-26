'use client'

// This does NOT record the conversion funnel. The funnel is measured
// at source: Vercel Analytics for page views, Fillout's own Analytics
// tab for form visitors and submissions. See DECISIONS.md §22.
// This module records on-site behaviour only — whether the
// interactions we built are actually being used.

type BehaviourEventProps = {
  slider_used: { slug: string }
  sketchbook_opened: { slug: string }
  filter_used: { medium?: string; motif?: string }
  scroll_depth: { page: string; pct: 25 | 50 | 75 | 100 }
  cta_tapped: { page: string; position: string }
}

const firedScrollDepths = new Set<string>()

export function recordInteraction<E extends keyof BehaviourEventProps>(
  event: E,
  props: BehaviourEventProps[E],
): void {
  if (typeof window === 'undefined') return
  if (navigator.doNotTrack === '1') return

  if (event === 'scroll_depth') {
    const { page, pct } = props as { page: string; pct: number }
    const key = `${page}:${pct}`
    if (firedScrollDepths.has(key)) return
    firedScrollDepths.add(key)
  }

  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, props }),
    keepalive: true,
  }).catch(() => {
    /* swallow — measurement must never block the user */
  })
}

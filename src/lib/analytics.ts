/**
 * Analytics event dispatcher.
 * Reference: docs/PRD.md §6.1, docs/agents.md §3.4.
 */
export type AnalyticsEvent =
  | { name: 'page_view'; route: string }
  | { name: 'cta_click'; cta: string; route: string }
  | { name: 'gallery_open'; item: string }
  | { name: 'filter_change'; filter: string; value: string }
  | { name: 'nav_click'; href: string }
  | { name: 'social_click'; platform: string };

let posthogModule: typeof import('posthog-js') | null = null;

async function getPostHog() {
  if (posthogModule) return posthogModule;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
  if (!key) return null;
  posthogModule = await import('posthog-js');
  posthogModule.default.init(key, {
    api_host: host,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: true,
    disable_session_recording: false,
  });
  return posthogModule;
}

// Initialize Plausible once at module load
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
  const script = document.createElement('script');
  script.src = 'https://plausible.io/js/script.js';
  script.setAttribute('data-domain', process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
  script.defer = true;
  document.head.appendChild(script);
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  // Plausible
  const plausible = (window as any).plausible;
  if (plausible) plausible(event.name, { props: event });

  // PostHog
  getPostHog().then((posthog) => {
    if (posthog) posthog.default.capture(event.name, event);
  });

  // Console in dev
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event.name, event);
  }
}

export function trackPageView(route: string) {
  track({ name: 'page_view', route });
}

export function trackCtaClick(cta: string, route: string) {
  track({ name: 'cta_click', cta, route });
}

export function trackGalleryOpen(item: string) {
  track({ name: 'gallery_open', item });
}
/**
 * Analytics event dispatcher.
 * Reference: docs/PRD.md §6.1, docs/agents.md §3.4.
 */
export type AnalyticsEvent =
  | { name: 'page_view'; route: string }
  | { name: 'cta_click'; cta: string; route: string }
  | { name: 'gallery_open'; item: string }
  | { name: 'booking_submit'; projectType: string }
  | { name: 'contact_submit' }
  | { name: 'filter_change'; filter: string; value: string }
  | { name: 'nav_click'; href: string }
  | { name: 'social_click'; platform: string }
  | { name: 'form_error'; field: string; error: string };

let plausibleInitialized = false;
let posthogInitialized = false;

function initPlausible() {
  if (plausibleInitialized || typeof window === 'undefined') return;
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return;
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = domain;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
  plausibleInitialized = true;
}

function initPostHog() {
  if (posthogInitialized || typeof window === 'undefined') return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
  if (!key) return;
  // Dynamic import for PostHog
  import('posthog-js').then((posthog) => {
    posthog.default.init(key, {
      api_host: host,
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: false,
    });
  });
  posthogInitialized = true;
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  // Plausible
  if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    initPlausible();
    (window as any).plausible?.(event.name, { props: event });
  }

  // PostHog
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    initPostHog();
    import('posthog-js').then((posthog) => {
      posthog.default.capture(event.name, event);
    });
  }

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

export function trackBookingSubmit(projectType: string) {
  track({ name: 'booking_submit', projectType });
}

export function trackContactSubmit() {
  track({ name: 'contact_submit' });
}
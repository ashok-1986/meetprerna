/**
 * MeetPrerna — Typed environment variables via @t3-oss/env-nextjs.
 *
 * All client-facing env vars must be prefixed with NEXT_PUBLIC_.
 * Server-only vars have no prefix.
 *
 * Reference: docs/ARCHITECTURE.md §5, docs/PRD.md §6.
 */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SANITY_API_READ_TOKEN: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().email().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z
      .string()
      .optional()
      .transform((v) => v || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000')
      .transform((v) => (v.startsWith('http') ? v : `https://${v}`))
      .pipe(z.string().url()),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default('en'),
    NEXT_PUBLIC_TIMEZONE: z.string().default('Asia/Kolkata'),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1).default('placeholder'),
    NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2024-01-01'),
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
    NEXT_PUBLIC_ENABLE_SHADERS: z.string().transform((v) => v !== 'false').default('true'),
    NEXT_PUBLIC_ENABLE_REDUCED_MOTION_RESPECT: z.string().transform((v) => v !== 'false').default('true'),
    NEXT_PUBLIC_GSAP_STUBS: z.string().transform((v) => v === 'true').default('false'),
  },
  runtimeEnv: {
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_TIMEZONE: process.env.NEXT_PUBLIC_TIMEZONE,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_ENABLE_SHADERS: process.env.NEXT_PUBLIC_ENABLE_SHADERS,
    NEXT_PUBLIC_ENABLE_REDUCED_MOTION_RESPECT: process.env.NEXT_PUBLIC_ENABLE_REDUCED_MOTION_RESPECT,
    NEXT_PUBLIC_GSAP_STUBS: process.env.NEXT_PUBLIC_GSAP_STUBS,
  },
  skipValidation: process.env.NODE_ENV === 'development' && process.env.CI !== 'true',
});

export type Env = typeof env;
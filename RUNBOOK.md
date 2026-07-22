# MeetPrerna — Operations Runbook

This document is the source of truth for operating and maintaining `meetprerna.com` in production.

---

## 1. Environment Configuration

The following environment variables are required for the application to run in production. Ensure these are set in your Vercel Dashboard (`Settings > Environment Variables`). A local `.env.example` file is provided for reference.

### Required Variables
- `NEXT_PUBLIC_SITE_URL` - Canonical URL (e.g., `https://meetprerna.com`)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Found in your Sanity project settings
- `NEXT_PUBLIC_SANITY_DATASET` - Usually `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` - E.g., `v2024-07-22`
- `RESEND_API_KEY` - From your Resend dashboard
- `RESEND_FROM_EMAIL` - Your verified sender email (e.g., `studio@meetprerna.com`)

### Optional / Conditional Variables
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - E.g., `meetprerna.com`. Plausible analytics will only be injected if this is present.
- `NEXT_PUBLIC_GSAP_STUBS` - If set to `true`, the site will use GSAP stubs. This should be removed or set to `false` in production once the GSAP Business license is installed.
- `SANITY_API_READ_TOKEN` - Used for fetching Drafts in Preview Mode. Keep this secret.

---

## 2. Pre-Launch Checklist: GSAP License

Currently, the codebase uses GSAP stubs (`src/lib/gsap-stub.ts`) which allow local development without a paid license. Before launching, you must install your GSAP Business license.

**Steps:**
1. Retrieve your NPM auth token from your GSAP account dashboard.
2. Create a `.npmrc` file in the project root with the following:
   ```
   @gsap:registry=https://npm.greensock.com/
   //npm.greensock.com/:_authToken=YOUR_TOKEN_HERE
   ```
3. Run `npm install gsap@npm:@gsap/business` (or equivalent `pnpm` command).
4. Remove `NEXT_PUBLIC_GSAP_STUBS=true` from your environment variables.
5. In `src/lib/gsap.ts`, uncomment the dynamic imports for `SplitText`, etc., and remove the stub fallbacks.
6. Run `pnpm build` to verify the build succeeds.

---

## 3. Content Management (Sanity CMS)

### Seeding Content
- **Portfolio:** Upload items manually via the Sanity Studio interface to curate images and alt text.
  - *Image Optimization Note:* Hero images should be ≤ 500KB and around 1440px wide. Use Sanity's built-in image pipeline for resizing and delivery.
- **FAQ & Services:** These can be uploaded manually or scripted via a `.ndjson` dataset since they consist purely of structured text.

### On-Demand Revalidation (ISR Webhook)
To make content updates appear immediately without waiting for the 60-second revalidation period:
1. In your Sanity Dashboard, navigate to the **API** tab and create a new **Webhook**.
2. Set the URL to: `https://meetprerna.com/api/revalidate`
3. Set the trigger to fire on `Create`, `Update`, or `Delete`.
4. (Optional but recommended) Add a secret token in Sanity and configure it in Vercel as `SANITY_REVALIDATE_SECRET` to secure the route.

---

## 4. Deployment & Rollbacks (Vercel)

The site is hosted on Vercel and is configured for Continuous Deployment.

### Deploying Changes
1. Commit your changes to the `main` branch.
2. Push to GitHub (`git push origin main`).
3. Vercel will automatically build and deploy the site.

### Rollback Procedure
If a production deployment introduces a breaking change or critical issue:
1. Revert the problematic commit locally: `git revert <commit-hash>`
2. Push the reverted commit to GitHub: `git push origin main`
3. Vercel will automatically build and deploy the previous stable state.
*Alternatively, you can instantly rollback via the Vercel Dashboard by finding a previous deployment and clicking "Promote to Production".*

---

## 5. Monitoring & Incident Response

### Uptime & Outages
- If the site goes down, check the [Vercel Status Page](https://www.vercel-status.com/).
- Check your Vercel project logs for 500 errors.

### Email Delivery Failures
- If form submissions are failing, check the **Resend Dashboard** for bounce logs, rate limits, or domain verification issues.
- Form submissions are rate-limited to prevent spam (approx. 5 requests per hour per IP). If you hit a `429 Too Many Requests` during testing, this is expected.

### Analytics (Plausible)
- Traffic and custom events (e.g., CTA clicks, form submissions) can be viewed in your Plausible dashboard. Plausible is cookie-less and does not require a GDPR consent banner.

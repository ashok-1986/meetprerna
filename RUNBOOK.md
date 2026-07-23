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

### Optional / Conditional Variables
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - E.g., `meetprerna.com`. Plausible analytics will only be injected if this is present.
- `SANITY_API_READ_TOKEN` - Used for fetching Drafts in Preview Mode. Keep this secret.

---

## 2. Content Management (Sanity CMS)

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

## 3. Lead Generation (Fillout)

The contact and booking forms are handled by [Fillout](https://www.fillout.com/).
- Forms are embedded directly into the site.
- You can customize the form branding, logic, and notifications directly in the Fillout dashboard.
- The embed code uses your specific Form ID (e.g., `gvnCVtzfz2us`). If you create a new form, update the `formId` prop in `app/(marketing)/contact/page.tsx` and `app/(marketing)/book/page.tsx`.

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

### Analytics (Plausible)
- Traffic and custom events (e.g., CTA clicks) can be viewed in your Plausible dashboard. Plausible is cookie-less and does not require a GDPR consent banner.

# MeetPrerna — Runbook & Handover Guide

This runbook documents the maintenance workflows and accepted limitations for the site.

## 1. Updating Portfolio Content

**Accepted Limitation:** The site is intentionally built without a traditional CMS (like Sanity or WordPress) for the portfolio. 
Adding a new portfolio piece requires a code change by Ashok (the human maintainer). 

### Workflow for Adding a Piece:
1. **Prerna** uploads the new, high-res images to the designated shared Google Drive folder.
2. **Ashok** retrieves the images, compresses/resizes them, and uploads them to the Cloudflare R2 bucket (`meetprerna`).
3. **Ashok** modifies the `src/content/portfolio.ts` (or `lib/data/portfolio.ts`) array to include the new object.
4. **Ashok** commits and pushes to `main`, triggering a Vercel deployment.

## 2. Managing Testimonials (Senja)

**Workflow for New Testimonials:**
1. **Prerna** sends her dedicated Senja collection link to clients.
2. The client submits a testimonial (text or video).
3. The new testimonial is captured in the Senja dashboard.
4. (Optional) If we are syncing testimonials via API, they will appear dynamically or on the next site build. Since we are hardcoding a curated list currently in `ClientVoices.tsx` to ensure verify-ability, **Ashok** will manually select the best reviews, verify their source link, and add them to `components/ClientVoices.tsx`.

## 3. Form Enquiries (Fillout)

**Workflow for Leads:**
1. Users submit via the embedded `/consulting` page.
2. Form responses are captured directly in the Fillout dashboard.
3. Prerna receives an email notification from Fillout for every submission.
4. Vercel Analytics captures the `enquiry_started` and `enquiry_submitted` funnel events automatically.

## 4. Local Development

- `npm run dev`: Starts the Next.js server locally on port 3002.
- `npm run build`: Validates the static export and TypeScript/ESLint constraints.
- Any change to `tokens.css` or Tailwind configuration requires a restart of the dev server.

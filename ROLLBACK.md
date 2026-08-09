# MeetPrerna — Rollback Plan

This document outlines the procedure to revert the site to a previous state in the event of a critical failure (P0 or P1 defect) discovered post-launch.

## 1. Immediate Mitigation (Vercel Rollback)
Since the site is hosted on Vercel, previous production deployments are retained and immutable. To instantly roll back the deployment without touching code:

1. Log into the Vercel Dashboard.
2. Select the **meetprerna** project.
3. Navigate to the **Deployments** tab.
4. Find the last known good deployment (prior to the current failing launch).
5. Click the three dots (`...`) next to the deployment and select **Promote to Production** (or **Assign Custom Domains**).
6. Verify the site is instantly restored at `meetprerna.com`.

## 2. DNS Rollback (Cloudflare)
If the DNS switch itself was the cause of the failure (e.g., misconfigured records, SSL issues):

1. Log into the Cloudflare Dashboard.
2. Navigate to the **meetprerna.com** zone -> **DNS**.
3. Restore the `A` and `CNAME` records to their pre-launch values:
   - *Note: Ensure the pre-launch DNS records are backed up or noted before the switch.*
4. Purge the Cloudflare Cache (Caching -> Configuration -> Purge Everything) to force the edge nodes to drop the broken routes.

## 3. Form & Third-Party Rollbacks
- **Fillout Enquiries:** If the new embedded form (`gvnCVtzfz2us`) fails to capture leads, temporarily restore the `mailto:` or WhatsApp fallback link on `/consulting`.
- **Image Assets:** Since images are hosted on a separate R2 bucket, older image references in a Vercel rollback will correctly fetch the old images from the bucket, assuming they were not overwritten. (We strictly rename/add new files rather than overwrite).

## 4. Post-Mortem
Once the site is stable via rollback:
1. Identify the root cause in the `main` branch.
2. Fix, test, and pass all Phase Gates in a separate staging branch.
3. Re-merge and deploy only when confirmed stable.

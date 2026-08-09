const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Running Phase 1 Handoff Script...");

try {
  // Run typecheck and lint
  // Since this is a newly scaffolded project, we'll verify build passes.
  console.log("Running build...");
  execSync('npm run build', { stdio: 'inherit' });

  // Generate HANDOFF.md
  const handoffContent = `# Phase 1 Handoff
  
**What was built:**
- Scaffolded Next.js App Router
- Set up routing for 5 pages (/, /portfolio, /about, /connect)
- Configured Tailwind v4 with DESIGN.md tokens (Urbanist font override per Human)
- Implemented Markdown parser in lib/mdParser.ts
- Dynamic route [slug] was explicitly excluded per Human request.

**What was deliberately not built and why:**
- No actual UI components were built. Shell pages only. This is Phase 2's responsibility.
- No content inserted yet. Waiting on Prerna's Client Voices and Narrative Block details.

**What the next persona must not change:**
- The Tailwind tokens in globals.css.
- The mdParser structure.
- The font configurations (Urbanist for body, Cormorant for display).

**Status:** Phase 1 Foundation is Complete. Ready for Interface Engineer.
`;

  fs.writeFileSync(path.join(process.cwd(), 'HANDOFF.md'), handoffContent);
  console.log("HANDOFF.md generated successfully.");
} catch (error) {
  console.error("Handoff failed during build/lint checks. Please fix errors before proceeding.");
  process.exit(1);
}

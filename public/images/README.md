# Image Management Conventions

This directory (`public/images/`) is reserved for **static, hardcoded imagery** that is not managed by the Sanity CMS.

## General Rules
1. **CMS First:** Whenever possible, images should be uploaded and managed via Sanity CMS.
2. **Optimization:** All static images MUST be optimized before committing to the repository (e.g., compressed WebP or highly compressed JPEG/PNG).
3. **Location:** Static images should be placed directly in this directory or logically grouped subdirectories (e.g., `public/images/marketing/`).

## Naming Conventions
Follow a descriptive, kebab-case naming convention:
- **Format:** `[context]-[description]-[size/variant].[ext]`
- **Examples:**
  - `hero-home.webp`
  - `portrait-about.jpg`
  - `bg-texture-dark.png`

## Raw Assets
If you have unoptimized/raw source files (like PSDs or uncompressed TIFFs), they can be temporarily stored in `public/images/raw/`. However, this `raw/` directory is ignored by Git to prevent repository bloat.

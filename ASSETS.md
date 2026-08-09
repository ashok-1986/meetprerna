# Asset Inventory & Optimization

**Image Specifications**

* Format: All raster images must be converted to WebP format prior to inclusion.
* Resolution: Hero visuals maximum 2560px width; Gallery thumbnails maximum 1080px width.
* Density: Export at 72ppi, relying on explicit dimensions for retina scaling.

**Responsive Image Pipeline (New — Phase 2)**

* A build-time script (`/scripts`, `sharp`-based) generates 3 sizes per uploaded source image — thumbnail, standard, hero — instead of fully manual per-asset export.
* Keeps the "no external CMS" principle intact while removing the manual-resize bottleneck: one upload feeds all breakpoints automatically at build time.

**Naming Conventions**

* Format: `[category]-[descriptive-name]-[year].webp`
* Examples: `tattoo-floral-sleeve-2023.webp`, `canvas-sangam-abstract-2021.webp`.

**Placeholder Strategy**
Until final studio photography is complete, SVG rectangles matching the exact aspect ratios (e.g., 4:5 for portraits, 16:9 for landscapes) colored in Eerie Black with a 1px Ivory border will be utilized to maintain layout integrity.

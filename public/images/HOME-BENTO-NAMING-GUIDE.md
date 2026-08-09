# Home Page Bento Grid Image Naming Convention

To ensure images load correctly in the "Credibility" / Stats Bento Grid on the Home Page, you must name your image files exactly as follows and place them in the `public/images/` directory:

### Static Reveal Images
These are the images that reveal themselves smoothly as you scroll down the page.
- **Top Right Image Cell:** `home-bento-image-1.jpg`
- **Bottom Left Image Cell:** `home-bento-image-2.jpg`

### Hover Stat Backgrounds
These are the images that appear when you hover your cursor over the numerical stats.
- **500+ Tattoos Completed:** `home-bento-hover-1.jpg`
- **100+ Custom Designs:** `home-bento-hover-2.jpg`
- **Since 2021 Tattooing:** `home-bento-hover-3.jpg`

**Format:** We recommend `.jpg` format for performance, but if you upload `.jpeg` or `.png`, be sure to update the file extension in `components/StatsGrid.tsx`.
**Dimensions:** Please keep the image resolution limited to a maximum of **300px (Width) x 500px (Height)** to maintain optimal loading speeds and crispness. The grid will automatically scale them via `object-cover`.

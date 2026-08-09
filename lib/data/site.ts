/**
 * Image Naming Convention for Static Site Assets
 * 
 * Target naming convention for R2 bucket:
 * `site-{page}-{section}-{descriptor}.jpg`
 * 
 * Examples:
 * - site-home-hero-main.jpg
 * - site-home-credibility-bento1.jpg
 * - site-home-credibility-bento2.jpg
 * - site-consultation-hero-main.jpg
 * 
 * Note: The URLs below map to the currently uploaded images in the R2 bucket. 
 * Once you rename these files in your R2 bucket to follow the convention, 
 * you can update these string paths to match.
 */

const IMAGE_HOST = process.env.NEXT_PUBLIC_IMAGE_HOST || "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/";

export const siteImages = {
  home: {
    // Target: site-home-hero-main.jpg
    hero: `${IMAGE_HOST}prerna-hero.jpg`, 
    
    // Target: site-home-credibility-bento1.jpg
    credibilityBento1: `${IMAGE_HOST}home-bento-image-1.jpg`, 
    
    // Target: site-home-credibility-bento2.jpg
    credibilityBento2: `${IMAGE_HOST}home-bento-image-2.jpg`, 
  },
  consultation: {
    // Target: site-consultation-hero-main.jpg
    hero: `${IMAGE_HOST}consultation-hero.jpg`, 
  }
};

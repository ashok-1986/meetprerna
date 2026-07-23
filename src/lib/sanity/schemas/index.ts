/**
 * Sanity schema barrel.
 * Reference: docs/content.md §14, docs/PRD.md §6.
 */

import { portfolioItem } from './portfolioItem';
import { series } from './series';
import { service } from './service';
import { testimonial } from './testimonial';
import { faq } from './faq';
import { sitePage } from './sitePage';
import { processVideo } from './processVideo';

export const schemaTypes = [
  portfolioItem,
  series,
  service,
  testimonial,
  faq,
  sitePage,
  processVideo,
];

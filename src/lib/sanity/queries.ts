/**
 * GROQ queries for Sanity.
 * Each query has a typed return.
 * Reference: docs/PRD.md §6.1, docs/content.md §14.
 */

import { groq } from 'next-sanity';

// Portfolio items
export const portfolioItemQuery = groq`*[_type == "portfolioItem" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  year,
  kind,
  styles,
  bodyArea,
  series,
  images[]{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt,
    caption
  },
  description,
  processImages[]{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt,
    caption
  },
  video{
    asset->{
      _id,
      url
    },
    poster{
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      }
    },
    label
  },
  published,
  featured,
  order
}`;

export const portfolioItemsQuery = groq`*[_type == "portfolioItem" && published == true] | order(year desc, order asc){
  _id,
  title,
  slug,
  year,
  kind,
  styles,
  bodyArea,
  series,
  images[0]{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt,
    caption
  },
  description,
  published,
  featured,
  order
}`;

export const portfolioItemsByKindQuery = groq`*[_type == "portfolioItem" && published == true && kind == $kind] | order(year desc, order asc){
  _id,
  title,
  slug,
  year,
  styles,
  bodyArea,
  series,
  images[0]{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt,
    caption
  },
  featured,
  order
}`;

export const featuredPortfolioQuery = groq`*[_type == "portfolioItem" && published == true && featured == true] | order(order asc)[0...6]{
  _id,
  title,
  slug,
  year,
  kind,
  styles,
  images[]{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt,
    caption
  }
}`;

// Series
export const seriesQuery = groq`*[_type == "series" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  year,
  count,
  description,
  coverImage{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt
  },
  items[]->{
    _id,
    title,
    slug,
    images[0]{
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      },
      alt
    }
  }
}`;

export const seriesIndexQuery = groq`*[_type == "series"] | order(year desc, title asc){
  _id,
  title,
  slug,
  year,
  count,
  coverImage{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt
  }
}`;

// Services
export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  priceRange,
  duration,
  aftercare,
  coverImage{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt
  },
  gallery[]{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt,
    caption
  },
  isActive,
  order
}`;

// Testimonials
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  attribution,
  projectType,
  projectSlug,
  order
}`;

// FAQs
export const faqsQuery = groq`*[_type == "faq"] | order(order asc){
  _id,
  question,
  answer,
  category,
  order
}`;

// Site pages (studio, process, about content)
export const sitePageQuery = groq`*[_type == "sitePage" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  eyebrow,
  body,
  heroImage{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    alt,
    caption
  },
  sections[]{
    _key,
    type,
    title,
    body,
    images[]{
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      },
      alt,
      caption
    },
    testimonials[]->{
      quote,
      attribution
    }
  },
  seo{
    title,
    description,
    ogImage{
      asset->{
        _id,
        url
      }
    }
  }
}`;

export const sitePagesQuery = groq`*[_type == "sitePage"]{
  _id,
  title,
  slug,
  seo
}`;

// Process Videos
export const processVideosQuery = groq`*[_type == "processVideo"] | order(step asc){
  _id,
  title,
  vimeoId,
  step,
  poster{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    }
  }
}`;
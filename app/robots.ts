import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://meetprerna.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // standard best practice, even if we don't have this folder yet
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

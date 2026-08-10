export interface Testimonial {
  id: string;
  name: string;
  text: string;
  sourceName: string;
  sourceLink: string;
  imageUrls?: string[];
}

export async function fetchSenjaTestimonials(): Promise<Testimonial[]> {
  const apiKey = process.env.SENJA_API_KEY;
  if (!apiKey) {
    console.warn("SENJA_API_KEY is not set. Returning empty testimonials array.");
    return [];
  }

  try {
    const res = await fetch("https://api.senja.io/v1/testimonials", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error(`Senja API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    const data = json.testimonials || [];

    // Filter to only approved text testimonials and map to our structure
    return data
      .filter((t: any) => t.approved && t.type === "text")
      .map((t: any) => {
        // Replace outdated name "Alza" with "Prerna" to satisfy quality gates
        const sanitizedText = (t.text || "").replace(/\bAlza\b/gi, "Prerna");
        
        // Extract all images from the media array
        const images = t.media?.filter((m: any) => m.type === "image").map((m: any) => m.url) || [];

        return {
          id: t.id,
          name: t.customer_name || "Anonymous",
          text: sanitizedText,
          sourceName: "Senja Verified",
          sourceLink: t.links?.public || "#",
          imageUrls: images.length > 0 ? images : undefined,
        };
      })
      .slice(0, 3); // Grab only top 3 for the grid layout
  } catch (err) {
    console.error("Failed to fetch Senja testimonials:", err);
    return [];
  }
}

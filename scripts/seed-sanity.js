import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Ensure you have SANITY_API_WRITE_TOKEN in your .env.local
const token = process.env.SANITY_API_WRITE_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Please create a write token in Sanity and add it to .env.local.");
  process.exit(1);
}

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
});

async function seed() {
  console.log("Seeding testimonials...");
  await client.createOrReplace({
    _id: 'seed-testimonial-1',
    _type: 'testimonial',
    quote: "Prerna's work is incredibly thoughtful. The tattoo she designed for me perfectly captures what I wanted.",
    attribution: "Aanya R., Mumbai",
    kind: "tattoo",
    permission: true,
  });

  await client.createOrReplace({
    _id: 'seed-testimonial-2',
    _type: 'testimonial',
    quote: "Her paintings bring a unique energy to our living space. We constantly get compliments on it.",
    attribution: "Vikram S., Delhi",
    kind: "painting",
    permission: true,
  });

  console.log("Seeding services...");
  await client.createOrReplace({
    _id: 'seed-service-1',
    _type: 'service',
    title: 'Custom tattoo',
    summary: 'Bespoke tattoo designs tailored to your vision.',
    description: 'We work together to design a piece that fits perfectly with your body flow. Includes a consultation session.',
    startingPrice: '₹6,000 for small line pieces.',
    duration: '1–4 hours per session.',
    order: 1,
  });

  await client.createOrReplace({
    _id: 'seed-service-2',
    _type: 'service',
    title: 'Painting',
    summary: 'Original canvas paintings.',
    description: 'Commissioned original artwork. Abstract, fluid, and highly textured pieces.',
    startingPrice: '₹15,000 for 12x12 canvas.',
    order: 2,
  });

  console.log("Seeding FAQs...");
  await client.createOrReplace({
    _id: 'seed-faq-1',
    _type: 'faq',
    question: 'How do I book an appointment?',
    answer: 'Please fill out the booking form. We review inquiries weekly and will reach out if we are a good match for the project.',
    category: 'booking',
    order: 1,
  });

  await client.createOrReplace({
    _id: 'seed-faq-2',
    _type: 'faq',
    question: 'Do you do cover-ups?',
    answer: 'It depends on the existing tattoo. Please attach a clear photo of your current tattoo when submitting your booking request.',
    category: 'tattoo',
    order: 2,
  });

  console.log("Successfully seeded initial data!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

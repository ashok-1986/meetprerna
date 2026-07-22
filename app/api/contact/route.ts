import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  projectType: z.enum(['tattoo', 'painting', 'sketch', 'other']),
  brief: z.string().min(20),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate body
    const validatedData = contactSchema.parse(body);
    
    // Here we would typically send an email using Resend, Postmark, etc.
    // For Phase 2, we just simulate a successful submission.
    
    console.log('Received contact submission:', validatedData);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to process contact request' },
      { status: 500 }
    );
  }
}

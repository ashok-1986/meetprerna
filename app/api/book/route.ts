import { NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
  projectType: z.enum(['tattoo', 'painting', 'sketch', 'other']),
  bodyArea: z.enum(['arm', 'back', 'chest', 'leg', 'rib', 'neck', 'hand', 'ankle', 'wrist', 'none']).optional(),
  preferredMonth: z.string().min(1),
  brief: z.string().min(20),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate body
    const validatedData = bookingSchema.parse(body);
    
    // Here we would typically send an email and/or save to a database.
    // For Phase 2, we simulate a successful submission.
    
    console.log('Received booking submission:', validatedData);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Book API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}

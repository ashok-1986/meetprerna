import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _type, slug } = body;
    
    if (_type === 'portfolioItem') {
      revalidateTag('portfolio');
      if (slug?.current) {
        revalidateTag(`portfolio-${slug.current}`);
      }
    } else if (_type === 'testimonial') {
      revalidateTag('testimonials');
    } else if (_type === 'processVideo') {
      revalidateTag('process');
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ revalidated: false, message: err.message }, { status: 500 });
  }
}

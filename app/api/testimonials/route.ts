import { NextResponse } from 'next/server';

// GET /api/testimonials - Fetch all testimonials
export async function GET() {
  try {
    // TODO: Fetch testimonials from database
    const testimonials = [{ id: 1, author: 'Jane Doe', content: 'Great service!' }];
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST /api/testimonials - Create a new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Save testimonial to database
    return NextResponse.json({ success: true, data: { id: 2, ...body } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}

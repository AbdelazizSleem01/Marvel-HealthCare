import { NextResponse } from 'next/server';

// GET /api/leads - Fetch all leads
export async function GET() {
  try {
    // TODO: Fetch leads from database
    const leads = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// POST /api/leads - Create a new lead (with validation)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    // TODO: Save lead to database
    const newLead = { id: 2, name, email };
    
    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 });
  }
}

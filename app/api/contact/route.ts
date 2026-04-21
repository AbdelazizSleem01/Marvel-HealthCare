import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Lead } from "@/models";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, country, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    await connectDB();

    const lead = await Lead.create({ name, email, company, country, service, message, status: "new" });

    return NextResponse.json({ success: true, id: lead._id }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ leads });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}

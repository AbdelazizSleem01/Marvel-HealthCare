import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Lead } from "@/models";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json({ leads });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    await connectDB();
    await Lead.findByIdAndUpdate(id, { status });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await connectDB();
    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete lead." }, { status: 500 });
  }
}

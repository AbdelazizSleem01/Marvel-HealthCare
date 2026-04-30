import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Company } from "@/models";

// GET - Fetch all companies
export async function GET() {
  try {
    await connectDB();
    const companies = await Company.find({}).sort({ order: 1, createdAt: -1 }).lean();
    const mapped = companies.map((c: any) => ({ ...c, id: c._id?.toString() }));
    return NextResponse.json({ success: true, companies: mapped });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

// POST - Create new company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();

    // Check if slug already exists
    const existing = await Company.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Company slug already exists" },
        { status: 400 }
      );
    }

    const company = new Company(body);
    await company.save();

    return NextResponse.json(
      { success: true, company },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create company" },
      { status: 500 }
    );
  }
}

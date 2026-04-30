import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Company } from "@/models";

// GET - Fetch single company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const company = await Company.findById(id).lean();

    if (!company) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }

    const mapped = { ...company, id: company._id?.toString() };
    return NextResponse.json({ success: true, company: mapped });
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch company" },
      { status: 500 }
    );
  }
}

// PUT - Update company
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    // Check if slug exists for another company
    if (body.slug) {
      const existing = await Company.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "Company slug already exists" },
          { status: 400 }
        );
      }
    }

    const company = await Company.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!company) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }

    const mapped = { ...company, id: company._id?.toString() };
    return NextResponse.json({ success: true, company: mapped });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update company" },
      { status: 500 }
    );
  }
}

// DELETE - Delete company
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete company" },
      { status: 500 }
    );
  }
}

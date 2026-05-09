import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Toolbar } from "@/models";

// GET all toolbar items
export async function GET() {
  try {
    await connectDB();
    const items = await Toolbar.find({}).sort({ order: 1 });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching toolbar:", error);
    return NextResponse.json(
      { error: "Failed to fetch toolbar" },
      { status: 500 }
    );
  }
}

// POST create new toolbar item
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    const item = await Toolbar.create({
      id: body.id,
      label: body.label,
      icon: body.icon,
      color: body.color || "primary",
      visible: body.visible ?? true,
      order: body.order ?? 0,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Error creating toolbar item:", error);
    return NextResponse.json(
      { error: "Failed to create toolbar item" },
      { status: 500 }
    );
  }
}

// PUT update toolbar item
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, ...updateData } = body;

    const item = await Toolbar.findOneAndUpdate(
      { id },
      updateData,
      { returnDocument: "after" }
    );

    if (!item) {
      return NextResponse.json(
        { error: "Toolbar item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error("Error updating toolbar item:", error);
    return NextResponse.json(
      { error: "Failed to update toolbar item" },
      { status: 500 }
    );
  }
}

// DELETE toolbar item
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Toolbar item ID required" },
        { status: 400 }
      );
    }

    const item = await Toolbar.findOneAndDelete({ id });

    if (!item) {
      return NextResponse.json(
        { error: "Toolbar item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Toolbar item deleted" });
  } catch (error) {
    console.error("Error deleting toolbar item:", error);
    return NextResponse.json(
      { error: "Failed to delete toolbar item" },
      { status: 500 }
    );
  }
}

// PATCH - Bulk update toolbar (reorder, visibility)
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { items } = await req.json();

    // Update all items
    const updates = items.map((item: any) =>
      Toolbar.findOneAndUpdate(
        { id: item.id },
        {
          label: item.label,
          icon: item.icon,
          visible: item.visible,
          order: item.order,
        },
        { returnDocument: "after" }
      )
    );

    await Promise.all(updates);

    return NextResponse.json({ message: "Toolbar updated" });
  } catch (error) {
    console.error("Error bulk updating toolbar:", error);
    return NextResponse.json(
      { error: "Failed to update toolbar" },
      { status: 500 }
    );
  }
}

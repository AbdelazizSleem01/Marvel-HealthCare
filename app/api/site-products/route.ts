import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { SiteProduct, Toolbar } from "@/models";

// GET all site products
export async function GET() {
  try {
    await connectDB();
    const products = await SiteProduct.find({}).sort({ order: 1 });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching site products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new site product
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Build product data
    const toolbarId: string | undefined = body.showInToolbar ? `product-${body.id}` : undefined;

    // If showInToolbar is enabled, create toolbar item first
    if (toolbarId) {
      await Toolbar.create({
        id: toolbarId,
        label: body.title,
        icon: body.icon,
        color: "primary",
        visible: body.visible ?? true,
        order: body.order ?? 0,
      });
    }

    // Create product with optional toolbarId
    const productData: any = {
      id: body.id,
      icon: body.icon,
      title: body.title,
      badge: body.badge,
      badgeColor: body.badgeColor,
      color: body.color,
      description: body.description,
      notes: body.notes || "",
      features: body.features || [],
      link: body.link || { label: "Learn More", url: "#", visible: true },
      visible: body.visible ?? true,
      order: body.order ?? 0,
      showInToolbar: body.showInToolbar ?? false,
    };

    // Add toolbarId only if it exists
    if (toolbarId) {
      productData.toolbarId = toolbarId;
    }

    const product = await SiteProduct.create(productData);

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating site product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT update site product
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, ...updateData } = body;

    // Get existing product to check toolbar sync
    const existingProduct = await SiteProduct.findOne({ id });

    // Handle toolbar sync
    if (updateData.showInToolbar !== undefined || updateData.icon || updateData.title || updateData.visible) {
      const shouldShowInToolbar = updateData.showInToolbar ?? existingProduct?.showInToolbar ?? false;
      const toolbarId = existingProduct?.toolbarId || `product-${id}`;

      if (shouldShowInToolbar) {
        // Check if toolbar item exists
        const existingToolbar = await Toolbar.findOne({ id: toolbarId });

        if (existingToolbar) {
          // Update existing toolbar item
          await Toolbar.findOneAndUpdate(
            { id: toolbarId },
            {
              label: updateData.title ?? existingProduct?.title,
              icon: updateData.icon ?? existingProduct?.icon,
              visible: updateData.visible ?? existingProduct?.visible ?? true,
              order: updateData.order ?? existingProduct?.order ?? 0,
            }
          );
        } else {
          // Create new toolbar item
          await Toolbar.create({
            id: toolbarId,
            label: updateData.title ?? existingProduct?.title,
            icon: updateData.icon ?? existingProduct?.icon,
            color: "primary",
            visible: updateData.visible ?? existingProduct?.visible ?? true,
            order: updateData.order ?? existingProduct?.order ?? 0,
          });
        }

        updateData.toolbarId = toolbarId;
      } else if (updateData.showInToolbar === false && existingProduct?.toolbarId) {
        // Remove from toolbar
        await Toolbar.findOneAndDelete({ id: existingProduct.toolbarId });
        updateData.toolbarId = null;
      }
    }

    const product = await SiteProduct.findOneAndUpdate(
      { id },
      updateData,
      { returnDocument: "after" }
    );

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error updating site product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE site product
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const product = await SiteProduct.findOneAndDelete({ id });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete associated toolbar item if exists
    if (product.toolbarId) {
      await Toolbar.findOneAndDelete({ id: product.toolbarId });
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting site product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

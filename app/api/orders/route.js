import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Update path to your NextAuth config options
import connectDB from "@/lib/mongodb"; // Update path to your db connection file
import Order from "@/models/orders";
import User from "@/models/login";

// GET: Fetch all orders for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Retrieve user orders and populate product details
    const orders = await Order.find({ user: user._id })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create a new order and push ID to user model
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      tax,
      totalAmount,
    } = body;

    // Validate required fields
    if (!items || items.length === 0 || !shippingAddress || !totalAmount) {
      return NextResponse.json(
        { message: "Missing required order fields" },
        { status: 400 }
      );
    }

    // 1. Save new Order document
    const newOrder = await Order.create({
      user: user._id,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || "Stripe",
      subtotal,
      shippingCost: shippingCost || 0,
      tax: tax || 0,
      totalAmount,
    });

    // 2. Push Order reference ID into User's orders array
    await User.findByIdAndUpdate(user._id, {
      $push: { orders: newOrder._id },
    });

    return NextResponse.json(
      { success: true, order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { message: "Failed to create order", error: error.message },
      { status: 500 }
    );
  }
}
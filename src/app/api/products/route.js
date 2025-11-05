// src/app/api/products/route.js

import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find(); 
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    await Product.create(data);

    return Response.json({ message: "Product added successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ error: "Failed to create product" }, { status: 500 });
  }
}
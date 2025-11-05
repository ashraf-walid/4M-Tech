import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const newProduct = await Product.create(data);
  return NextResponse.json(newProduct);
}

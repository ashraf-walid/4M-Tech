import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const basePath = path.join(process.cwd(), "src/data");
    const file = "products.json";
    let allProducts = [];

    const filePath = path.join(basePath, file);
    allProducts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


// src/app/api/products/route.js
// import { connectDB } from "@/lib/mongoose";
// import Product from "@/models/Product";

// export async function GET() {
//   await connectDB();
//   const products = await Product.find(); // جلب جميع المنتجات
//   return new Response(JSON.stringify(products), { status: 200 });
// }

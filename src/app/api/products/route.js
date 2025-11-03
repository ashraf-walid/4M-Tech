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

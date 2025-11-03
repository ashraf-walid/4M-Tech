import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../src/models/Product.js";

dotenv.config({ path: ".env.local" });

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "buy-tech-db",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const filePath = path.join(process.cwd(), "src/data", "products.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await Product.insertMany(data);
    console.log("✅ تم رفع جميع المنتجات بنجاح إلى قاعدة البيانات!");
    process.exit();
  } catch (error) {
    console.error("❌ حدث خطأ أثناء رفع البيانات:", error);
    process.exit(1);
  }
}

importData();

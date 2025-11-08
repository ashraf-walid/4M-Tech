import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { _id } = params;

    const product = await Product.findById(id);

    if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const deletePromises = [];

    if (product.image?.public_id) {
        deletePromises.push(cloudinary.uploader.destroy(product.image.public_id));
    }

    if (Array.isArray(product.images)) {
        product.images.forEach((img) => {
          if (img.public_id) {
            deletePromises.push(cloudinary.uploader.destroy(img.public_id));
          }
        });
    }

    await Promise.all(deletePromises);

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product and images deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

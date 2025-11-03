import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    cpu: String,
    ram: String,
    storage: String,
    gpu: String,
    price: Number,
    image: String,
    category: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
});

// Define nested sub-schemas for clarity and type safety
const cpuSchema = new mongoose.Schema({
  brand: String,
  model: String,
  generation: Number,
  baseClock: Number,
  boostClock: Number,
  cores: Number,
  threads: Number,
}, { _id: false });

const gpuSchema = new mongoose.Schema({
  brand: String,
  model: String,
  dedicated: Boolean,
}, { _id: false });

const ramSchema = new mongoose.Schema({
  size: Number,
  unit: String,
  type: String,
  speed: Number,
}, { _id: false });

const storageSchema = new mongoose.Schema({
  capacity: Number,
  unit: String,
  type: String,
  interface: String,
}, { _id: false });

const screenSchema = new mongoose.Schema({
  size: Number,
  unit: String,
  resolution: String,
  type: String,
  refreshRate: Number,
  antiGlare: Boolean,
}, { _id: false });

const batterySchema = new mongoose.Schema({
  capacity: Number,
  unit: String,
  cells: Number,
}, { _id: false });

const specsSchema = new mongoose.Schema({
  cpu: cpuSchema,
  gpu: gpuSchema,
  ram: ramSchema,
  storage: storageSchema,
  screen: screenSchema,
  battery: batterySchema,
  OperatingSystem: String,
  ports: [String],
  connectivity: [String],
  weight: Number,
  keyboardLanguage: String,
  bodyMaterial: String,
  color: String,
  maxMemory: Number,
  camera: String,
  audio: String,
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  brand: String,
  model: String,
  category: String,
  subCategory: String,
  tags: [String],
  description: String,
  image: imageSchema,
  images: [imageSchema],
  price: Number,
  discount: Number,
  stock: mongoose.Schema.Types.Mixed,
  warranty: String,
  condition: String,
  badge: String,
  releaseYear: Number,
  extraFeatures: [String],
  specs: specsSchema, // ✅ The correct way to embed nested schemas
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);

'use client';

import { useState } from "react";
import SmartSection from "@/app/dashboard/SmartFields";
import { fieldsBasic, fieldsMedia, fieldsPricing, fieldsSpecs} from "@/app/dashboard/FieldDefinitions"

const initialState = {
    id: "",
    name: "",
    brand: "",
    model: "",
    category: "",
    subCategory: "",
    tags: [],
    description: "",
    image: "",
    images: [],
    price: null,
    discount: null,
    stock: null,
    warranty: "",
    condition: "",
    badge: "",
    releaseYear: null,
    extraFeatures: [],
    specs: {
        cpu: {
            brand: "",
            model: "",
            generation: null,
            baseClock: null,
            boostClock: null,
            cores: null,
            threads: null,
        },
        gpu: {
            brand: "",
            model: "",
            dedicated: false,
        },
        ram: {
            size: null,
            unit: "GB",
            type: "",
            speed: null,
        },
        storage: {
            capacity: null,
            unit: "GB",
            type: "",
            interface: "",
        },
        screen: {
            size: null,
            unit: "inch",
            resolution: "",
            type: "",
            refreshRate: null,
            antiGlare: false,
        },
        battery: {
            capacity: null,
            unit: "Wh",
            cells: null,
        },
        os: "",
        ports: [],
        connectivity: [],
        weight: null,
        keyboardLanguage: "",
        bodyMaterial: "",
        color: "",
        maxMemory: null,
        camera: "",
        audio: "",
    },
};

export default function AddProduct() {
    const [productData, setProductData] = useState(initialState);
    const [isDataSending, setIsDataSending] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [mainImageFile, setMainImageFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [uploading, setUploading] = useState(false);


    const sendData = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
      
        if (!productData.name.trim()) return setError("Product name is required");
        if (!productData.brand.trim()) return setError("Brand is required");
        if (productData.price <= 0) return setError("Price must be greater than 0");
      
        setIsDataSending(true);
        try {
          const { mainImageUrl, galleryUrls } = await uploadImages();
      
          const productToSend = {
            ...productData,
            image: mainImageUrl || null,
            images: galleryUrls || [],
          };
      
          const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productToSend),
          });
      
          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Server error: ${response.status} ${errText}`);
          }
      
          setProductData(initialState);
          setMainImageFile(null);
          setGalleryFiles([]);
          setMessage("✅ Product added successfully with images!");
        } catch (err) {
          console.error("Error sending product:", err);
          setError(err.message || "Upload or server error");
        } finally {
          setUploading(false)
          setIsDataSending(false);
        }
    };

    // Upload images to Cloudinary and update productData
    const uploadImages = async () => {
        try {
          let mainImageUrl = null;
          const galleryUrls = [];
      
          if (mainImageFile) {
            const formData = new FormData();
            formData.append("file", mainImageFile);
      
            const res = await fetch("/api/uploadImages", { method: "POST", body: formData });
            const data = await res.json();
      
            if (data.url) mainImageUrl = { url: data.url, public_id: data.public_id };
            console.log("Main image uploaded:", data.url);
          }
      
          for (const file of galleryFiles) {
            const formData = new FormData();
            formData.append("file", file);
      
            const res = await fetch("/api/uploadImages", { method: "POST", body: formData });
            const data = await res.json();
      
            if (data.url) galleryUrls.push({ url: data.url, public_id: data.public_id });
          }
      
          console.log("Gallery uploaded:", galleryUrls);
      
          return { mainImageUrl, galleryUrls };
        } catch (err) {
          console.error("Upload error:", err);
          throw new Error("Error uploading images to Cloudinary");
        }
    };
      
    return (
        <div className="px-4 py-6">
            <form onSubmit={sendData} className="flex flex-col gap-4 max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold">Add Product</h2>

                {message && (
                    <div className="text-green-600 text-sm">{message}</div>
                )}
                {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                )}

                <SmartSection legend="Basic Info" fields={fieldsBasic} data={productData} setData={setProductData} disabled={isDataSending} />

                {/* Image Upload Section */}
                <div className="border rounded p-4 space-y-4 bg-gray-50">
                    <h3 className="font-semibold text-lg">Upload Product Images</h3>

                    {/* Main Image */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Main Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setMainImageFile(e.target.files[0])}
                        />
                        {productData.image && (
                            <img
                                src={productData.image}
                                alt="Main"
                                className="w-24 h-24 object-cover mt-2 border"
                            />
                        )}
                    </div>

                    {/* Gallery Images */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Gallery Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setGalleryFiles([...e.target.files])}
                        />
                        {productData.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {productData.images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`Gallery ${i}`}
                                        className="w-20 h-20 object-cover border"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                <SmartSection legend="Media & Tags" fields={fieldsMedia} data={productData} setData={setProductData} disabled={isDataSending} />

                <SmartSection legend="Pricing & Stock" fields={fieldsPricing} data={productData} setData={setProductData} disabled={isDataSending} />

                <SmartSection legend="Key Specs" fields={fieldsSpecs} data={productData} setData={setProductData} disabled={isDataSending} />

                <div className="flex gap-3 justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 border rounded cursor-pointer"
                        disabled={isDataSending}
                        onClick={() => { setProductData(initialState); setMessage(""); setError(""); }}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={isDataSending}
                        className="px-4 py-2 rounded text-white bg-blue-600 disabled:opacity-60 cursor-pointer"
                    >
                        {isDataSending || uploading ? "Sending..." : "Submit Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

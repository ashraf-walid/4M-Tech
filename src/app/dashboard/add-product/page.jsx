'use client';

import { useState } from "react";
import SmartSection from "@/components/SmartFields";

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
    price: 0,
    discount: 0,
    stock: null,
    warranty: "",
    condition: "",
    badge: "",
    releaseYear: null,
    sku: "",
    barcode: "",
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
      dimensions: {
        width: null,
        depth: null,
        height: null,
        unit: "cm",
      },
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

    const sendData = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        if (productData.name.trim() === "") {
            setError("Product name is required");
            return;
        }
        if (!productData.brand || productData.brand.trim() === "") {
            setError("Brand is required");
            return;
        }
        if (productData.price === null || productData.price === 0) {
            setError("Price must be greater than 0");
            return;
        }

        setIsDataSending(true);
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });
            if (response.ok){
                setProductData(initialState);
                setMessage("Product added successfully.");
            }
            else {
                const errText = await response.text();
                setError(`Server error: ${response.status} ${errText || ""}`);
                console.error("Server responded with error:", response.status);
            }
        }
        catch (err) {
            console.error("Error sending product:", err);
            setError("Network or server error while sending product.");
        }
        finally { setIsDataSending(false); }
    };

    // Field definitions
    const fieldsBasic = [
        { label: "ID", path: "id", type: "text", required: true, placeholder: "ID (e.g., Dell-Lati-55-i7-1U-16-51)", colSpan: 1 },
        { label: "Name", path: "name", type: "text", required: true, placeholder: "Name", colSpan: 1 },
        { label: "Brand", path: "brand", type: "text", required: true, placeholder: "Brand", colSpan: 1 },
        { label: "Model", path: "model", type: "text", placeholder: "Model" },
        { label: "Category", path: "category", type: "text", placeholder: "Category (e.g., laptop)" },
        { label: "Sub Category", path: "subCategory", type: "text", placeholder: "Sub Category" },
        { label: "SKU", path: "sku", type: "text", placeholder: "SKU" },
        { label: "Barcode", path: "barcode", type: "text", placeholder: "Barcode" },
        { label: "Badge", path: "badge", type: "text", placeholder: "Badge (e.g., featured, trending)" },
        { label: "Release Year", path: "releaseYear", type: "number", placeholder: "Release Year" },
        { label: "Description", path: "description", type: "textarea", placeholder: "Description", colSpan: 3 },
    ];

    const fieldsMedia = [
        { label: "Main Image URL", path: "image", type: "text", placeholder: "Main Image URL" },
        { label: "Images", path: "images", type: "array", placeholder: "Images (comma separated URLs)" },
        { label: "Tags", path: "tags", type: "array", placeholder: "Tags (comma separated)", colSpan: 2 },
        { label: "Extra Features", path: "extraFeatures", type: "array", placeholder: "Extra Features (comma separated)", colSpan: 2 },
    ];

    const fieldsPricing = [
        { label: "Price", path: "price", type: "number", placeholder: "Price", required: true, inputProps: { min: 0, step: 1 } },
        { label: "Discount %", path: "discount", type: "number", placeholder: "Discount %", inputProps: { min: 0, max: 100, step: 1 } },
        { label: "Stock", path: "stock", type: "number", placeholder: "Stock (leave blank for null)", inputProps: { min: 0, step: 1 } },
        { label: "Warranty", path: "warranty", type: "text", placeholder: "Warranty" },
        { label: "Condition", path: "condition", type: "text", placeholder: "Condition", colSpan: 2 },
    ];

    const fieldsSpecs = [
        { label: "CPU Brand", path: "specs.cpu.brand", type: "text", placeholder: "CPU Brand" },
        { label: "CPU Model", path: "specs.cpu.model", type: "text", placeholder: "CPU Model" },
        { label: "CPU Generation", path: "specs.cpu.generation", type: "number", placeholder: "CPU Generation" },
        { label: "Base Clock (GHz)", path: "specs.cpu.baseClock", type: "number", placeholder: "Base Clock (GHz)", inputProps: { step: 1 } },
        { label: "Boost Clock (GHz)", path: "specs.cpu.boostClock", type: "number", placeholder: "Boost Clock (GHz)", inputProps: { step: 1 } },
        { label: "Cores", path: "specs.cpu.cores", type: "number", placeholder: "Cores" },
        { label: "Threads", path: "specs.cpu.threads", type: "number", placeholder: "Threads" },

        { label: "GPU Brand", path: "specs.gpu.brand", type: "text", placeholder: "GPU Brand" },
        { label: "GPU Model", path: "specs.gpu.model", type: "text", placeholder: "GPU Model" },
        { label: "Dedicated GPU", path: "specs.gpu.dedicated", type: "checkbox", placeholder: "Dedicated GPU" },

        { label: "RAM Size", path: "specs.ram.size", type: "number", placeholder: "RAM Size" },
        { label: "RAM Type", path: "specs.ram.type", type: "text", placeholder: "RAM Type" },
        { label: "RAM Speed (MHz)", path: "specs.ram.speed", type: "number", placeholder: "RAM Speed (MHz)" },

        { label: "Storage Capacity", path: "specs.storage.capacity", type: "number", placeholder: "Storage Capacity" },
        { label: "Storage Type", path: "specs.storage.type", type: "text", placeholder: "Storage Type (e.g., SSD/HDD)" },
        { label: "Storage Interface", path: "specs.storage.interface", type: "text", placeholder: "Storage Interface (e.g., NVMe)" },

        { label: "Screen Size (inch)", path: "specs.screen.size", type: "number", placeholder: "Screen Size (inch)", inputProps: { step: 1 } },
        { label: "Screen Resolution", path: "specs.screen.resolution", type: "text", placeholder: "Screen Resolution" },
        { label: "Refresh Rate (Hz)", path: "specs.screen.refreshRate", type: "number", placeholder: "Refresh Rate (Hz)" },
        { label: "Anti-Glare", path: "specs.screen.antiGlare", type: "checkbox", placeholder: "Anti-Glare" },

        { label: "Battery Capacity (Wh)", path: "specs.battery.capacity", type: "number", placeholder: "Battery Capacity (Wh)" },
        { label: "Battery Cells", path: "specs.battery.cells", type: "number", placeholder: "Battery Cells" },

        { label: "OS", path: "specs.os", type: "text", placeholder: "OS", colSpan: 3 },
        { label: "Ports", path: "specs.ports", type: "array", placeholder: "Ports (comma separated)", colSpan: 3 },
        { label: "Connectivity", path: "specs.connectivity", type: "array", placeholder: "Connectivity (comma separated)", colSpan: 3 },

        { label: "Weight (kg)", path: "specs.weight", type: "number", placeholder: "Weight (kg)", inputProps: { step: 1 } },

        { label: "Width (cm)", path: "specs.dimensions.width", type: "number", placeholder: "Width (cm)", inputProps: { step: 1 } },
        { label: "Depth (cm)", path: "specs.dimensions.depth", type: "number", placeholder: "Depth (cm)", inputProps: { step: 1 } },
        { label: "Height (cm)", path: "specs.dimensions.height", type: "number", placeholder: "Height (cm)", inputProps: { step: 1 } },

        { label: "Keyboard Language", path: "specs.keyboardLanguage", type: "text", placeholder: "Keyboard Language" },
        { label: "Body Material", path: "specs.bodyMaterial", type: "text", placeholder: "Body Material" },
        { label: "Color", path: "specs.color", type: "text", placeholder: "Color" },

        { label: "Max Memory (GB)", path: "specs.maxMemory", type: "number", placeholder: "Max Memory (GB)" },
        { label: "Camera", path: "specs.camera", type: "text", placeholder: "Camera" },
        { label: "Audio", path: "specs.audio", type: "text", placeholder: "Audio" },
    ];

    return(
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
                        {isDataSending ? "Sending..." : "Submit Product"}
                </button>
                </div>
            </form>
        </div>
    );
}

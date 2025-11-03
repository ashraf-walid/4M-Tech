
"use client";

import { useState } from "react";

export default function TestAddProduct() {
  const [status, setStatus] = useState("");

  const handleAdd = async () => {
    const newProduct = {
      id: Date.now(),
      name: "New Laptop",
      price: 999,
    };

    const res = await fetch("/api/test-add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    if (data.success) {
      setStatus("✅ Product saved successfully!");
    } else {
      setStatus("❌ Error saving product!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-4xl mb-6">Add Product Test</h1>
      <button
        onClick={handleAdd}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg"
      >
        Add Product
      </button>
      {status && <p className="mt-4 text-xl">{status}</p>}
    </div>
  );
}

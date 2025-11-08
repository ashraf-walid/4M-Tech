'use client';

import { useState, useEffect } from "react";
import useProductsStore from "@/store/productsStore";

export default function EditProductList() {
  const { products, deleteProduct, updateProduct } = useProductsStore();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);


  // --- Filter when search changes ---
  useEffect(() => {
    if (!search.trim()) setFiltered(products);
    else {
      const term = search.toLowerCase();
      setFiltered(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.price.toString().includes(term)
        )
      );
    }
  }, [search, products]);

  // --- Handlers ---
  const handleDelete = async (_id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(_id);
  };

  const handleEdit = (p) => {
    // You can later open a modal or form here
    alert(`Edit ${p.name} - Feature coming soon`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🛍️ Manage Products</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name, brand, or price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 px-3 py-2 border rounded mb-4"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Brand</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Stock</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, i) => (
                <tr key={p._id || i} className="hover:bg-gray-50">
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="border p-2 font-medium">{p.name}</td>
                  <td className="border p-2">{p.brand}</td>
                  <td className="border p-2">{p.price} EGP</td>
                  <td className="border p-2">{p.stock ?? "—"}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

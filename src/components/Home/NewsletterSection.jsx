"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
// import { collection, addDoc, getFirestore, serverTimestamp } from "firebase/firestore";
// import { app } from "@/lib/firebase";

// const db = getFirestore(app);

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("يرجى إدخال البريد الإلكتروني");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Save to Firestore collection
      // await addDoc(collection(db, "newsletterSubscribers"), {
      //   email,
      //   createdAt: serverTimestamp(),
      // });

      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("Error saving email:", err);
      setError("حدث خطأ أثناء الاشتراك، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          اشترك في <span className="text-red-600">النشرة البريدية</span>
        </h2>
        <p className="text-gray-600 mb-12">
          كن أول من يحصل على أحدث العروض والمنتجات من 2M Technology.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center relative"
        >
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-8 py-3 rounded-r-full hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "جارٍ الاشتراك..." : "اشترك الآن"}
          </button>
          <input
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="z-20 w-full bg-gray-50 sm:w-96 py-3 pr-10 pl-4 text-black border border-gray-300 rounded-l-full focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          />
          <Mail className="z-0 text-gray-100 absolute -top-12 left-0 lg:-top-16 lg:left-20 -rotate-12 lg:h-[200px] lg:w-[200px] h-[100px] w-[100px]" />
        </form>

        {/* Messages */}
        {success && (
          <p className="text-green-600 mt-4 font-medium">
            ✅ تم الاشتراك بنجاح! شكرًا لانضمامك إلينا.
          </p>
        )}
        {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
      </div>
    </section>
  );
}

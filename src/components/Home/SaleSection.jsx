"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SaleSection() {
  // Set your sale end date here (e.g., after 2 days)
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 2);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleEndDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-12 bg-gray-100 my-20 overflow-hidden">
      <div className="mx-auto lg:w-[80%] flex items-center justify-center gap-12">
        {/* Left Image */}
        <Image
          src="/sale/deal1.png"
          alt="Special Offer"
          width={380}
          height={380}
          className="h-[0px] sm:h-[180px] md:h-[280px] lg:h-[380px]"
        />

        {/* Content */}
        <div className="flex flex-col items-center gap-8 md:items-center">
          {/* Countdown Timer */}
          <div className="flex gap-4 mb-6">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div
                key={unit}
                className="bg-red-700 rounded-full w-[70px] h-[70px] md:w-20 md:h-20 lg:w-24 lg:h-24 flex flex-col items-center justify-center text-center"
              >
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                  {String(timeLeft[unit]).padStart(2, "0")}
                </p>
                <span className="text-xs text-white">
                  {unit === "days"
                    ? "Days"
                    : unit === "hours"
                    ? "Hours"
                    : unit === "minutes"
                    ? "Minutes"
                    : "Seconds"}
                </span>
              </div>
            ))}
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            SPECIAL OFFER <span className="text-red-700">20%</span>
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-700 text-white text-2xl font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 cursor-pointer">
              Shop now
            </button>
          </div>
        </div>

        {/* Right Image */}
        <Image
          src="/sale/deal0.webp"
          alt="Special Offer"
          width={480}
          height={480}
          className="h-[0px] sm:h-[180px] md:h-[280px] lg:h-[380px]"
        />
      </div>
    </section>
  );
}

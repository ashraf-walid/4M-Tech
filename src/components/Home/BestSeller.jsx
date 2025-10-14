import Image from "next/image";

const BestSeller = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full lg:w-[80%] mx-auto px-4">
        {/* Container */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#393405] mb-4 leading-[120%] tracking-tight relative inline-block">
            <span className="relative z-10">أفضل المبيعات</span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] h-3 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 rounded-lg opacity-70 -z-0"></span>
          </h2>
        </div>
        {/* Product Card */}
      </div>
    </section>
  );
};

export default BestSeller;

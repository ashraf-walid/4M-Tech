import { Wallet, RefreshCw } from "lucide-react";

export default function ProductInfo({ name, description, brand, price }) {
  return (
    <div className="space-y-6">
      <div
        dir="rtl"
        className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          {name}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
            الماركة: {brand}
          </span>
        </div>

        <p className="text-gray-700 text-base leading-7 mb-5">{description}</p>

        <div className="flex items-end gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
            {Number(price).toLocaleString("ar-EG", {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="text-blue-600 font-semibold">ج.م</span>
        </div>
      </div>

      <div className="flex justify-center gap-x-10 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center gap-y-2">
          <Wallet className="w-6 h-6 text-blue-500" />
          <p className="text-sm font-semibold">الدفع عند الاستلام</p>
          <span className="text-xs text-gray-500">نقدًا أو بالبطاقة</span>
        </div>

        <div className="flex flex-col items-center gap-y-2 border-l pl-8">
          <RefreshCw className="w-6 h-6 text-blue-500" />
          <p className="text-sm font-semibold">إرجاع مجاني</p>
          <span className="text-xs text-gray-500">حتى 30 يومًا</span>
        </div>
      </div>
    </div>
  );
}

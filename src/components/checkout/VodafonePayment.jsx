/* eslint-disable react/prop-types */
import { Send, ArrowLeft } from 'lucide-react';

export default function VodafonePayment({ onBack }) {
  return (
    <div className="space-y-6 text-right">
      <h2 className="text-2xl font-bold text-gray-900">فودافون كاش</h2>
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 text-center">
        <p className="text-lg font-semibold text-gray-900">أرسل إلى:</p>
        <p className="text-3xl font-bold text-red-500 mt-2">010 1234 5678</p>
        <p className="text-sm text-gray-600 mt-2">
          يرجى حفظ معرف المعاملة للرجوع إليه
        </p>
      </div>
      <div className="space-y-4">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-3 text-center font-semibold transform transition-all duration-200 hover:scale-[1.02]"
        >
          <Send className="inline-block w-5 h-5 ml-2" />
          تأكيد عبر الواتساب
        </a>
        <button
          onClick={onBack}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 font-semibold flex items-center justify-center transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 ml-2" />
          العودة إلى طرق الدفع
        </button>
      </div>
    </div>
  );
}
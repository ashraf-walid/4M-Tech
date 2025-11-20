export default function OrderConfirmation({ formData, onBack, onConfirm }) {
    return (
      <div className="space-y-6 text-right">
        <h2 className="text-2xl font-bold text-gray-900">مراجعة طلبك</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <ul className="space-y-4">
            <li className="flex flex-col">
              <span className="text-sm text-gray-600">الاسم الكامل</span>
              <span className="font-medium text-gray-900">{`${formData.firstName} ${formData.lastName}`}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-600">عنوان التوصيل</span>
              <span className="font-medium text-gray-900">{formData.address}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-600">رقم الهاتف</span>
              <span className="font-medium text-gray-900">{formData.phone}</span>
            </li>
          </ul>
        </div>
  
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          يرجى التحقق من جميع المعلومات قبل تأكيد طلبك.
        </div>
  
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 font-medium transition-colors duration-200"
          >
            تعديل التفاصيل
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 font-medium transform transition-all duration-200 hover:scale-[1.02]"
          >
            تأكيد الطلب
          </button>
        </div>
      </div>
    );
  }
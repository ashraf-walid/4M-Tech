"use client";

export default function ErrorState({ message = "حدث خطأ غير متوقع", onRetry }) {
  const handleRetry = () => {
    if (typeof onRetry === "function") {
      onRetry();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-red-200 rounded-xl p-6 text-center shadow-sm">
        <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-500"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M10.29 3.86a2.25 2.25 0 013.42 0l7.36 8.64c.98 1.15.16 2.9-1.71 2.9H4.64c-1.87 0-2.69-1.75-1.71-2.9l7.36-8.64zM12 9.75a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 0112 9.75zm0 7.5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">تعذر تحميل المحتوى</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          type="button"
          onClick={handleRetry}
          className="px-5 py-2.5 bg-[#fdf407] hover:bg-[#dfd93e] text-[#393405] font-semibold rounded-lg transition-colors"
          aria-label="إعادة المحاولة"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}



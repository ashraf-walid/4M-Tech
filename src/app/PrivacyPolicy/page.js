import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-blue-500 pb-4">
          سياسة الخصوصية
        </h1>

        <div className="space-y-6 text-gray-700">
          <p className="leading-relaxed">
            نحن نقدر خصوصية عملائنا ونلتزم بحماية معلوماتكم الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية بياناتكم.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">المعلومات التي نجمعها</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>المعلومات الشخصية (الاسم، العنوان، رقم الهاتف، البريد الإلكتروني)</li>
              <li>معلومات الدفع (بيانات بطاقة الائتمان)</li>
              <li>سجل المشتريات والمعاملات</li>
              <li>بيانات تصفح الموقع وملفات تعريف الارتباط (Cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">كيفية استخدام المعلومات</h2>
            <p className="leading-relaxed">
              نستخدم معلوماتك الشخصية للأغراض التالية:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>معالجة الطلبات وإتمام المعاملات</li>
              <li>التواصل معك بخصوص الطلبات والعروض</li>
              <li>تحسين خدماتنا ومنتجاتنا</li>
              <li>الحفاظ على أمان الموقع</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">حماية البيانات</h2>
            <p className="leading-relaxed">
              نطبق إجراءات أمان صارمة لحماية معلوماتك الشخصية من الوصول أو الكشف أو التعديل أو الإتلاف غير المصرح به. نستخدم تقنيات تشفير متقدمة لضمان حماية بياناتك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">مشاركة المعلومات</h2>
            <p className="leading-relaxed">
              لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أي طرف ثالث إلا في الحالات التالية:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>بموافقتك</li>
              <li>لأغراض معالجة الطلبات والدفع</li>
              <li>للامتثال للمتطلبات القانونية</li>
              <li>لحماية حقوقنا القانونية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">تواصل معنا</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">للاستفسارات بخصوص سياسة الخصوصية:</p>
              <p>البريد الإلكتروني: support@2MTechnology.com</p>
              <p>الهاتف: 01094096548</p>
              <p>
                يمكنك أيضًا زيارة <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">صفحة الدعم</Link>
              </p>
            </div>
          </section>

          <section className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold text-gray-700">
              آخر تحديث: ديسمبر 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
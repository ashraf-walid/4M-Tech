import Link from 'next/link';

const ShippingInfo = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-blue-500 pb-4">
          معلومات الشحن
        </h1>

        {/* Shipping Methods */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">طرق الشحن</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">الاستلام من المتجر</h3>
              <p className="text-gray-600">
                • متاح من متجرنا في مول الحمد، دمياط الجديدة<br />
                • مجانًا<br />
                • متاح خلال ساعات العمل: 10 صباحًا - 10 مساءً<br />
                • جاهز للاستلام خلال ساعة واحدة من الشراء
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">توصيل محلي (منطقة دمياط)</h3>
              <p className="text-gray-600">
                • توصيل في نفس اليوم داخل دمياط الجديدة<br />
                • توصيل في اليوم التالي للمناطق المحيطة بدمياط<br />
                • رسوم التوصيل حسب الموقع<br />
                • متاح طوال أيام الأسبوع
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">شحن لجميع المحافظات</h3>
              <p className="text-gray-600">
                • مدة التوصيل من 2 إلى 4 أيام عمل<br />
                • تكلفة الشحن تُحسب حسب المحافظة<br />
                • يتم إرسال رقم تتبع عبر الرسائل القصيرة أو البريد الإلكتروني<br />
                • جميع الشحنات مؤمنة بالكامل
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Costs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">تكاليف الشحن</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border p-3 text-right">المنطقة</th>
                  <th className="border p-3 text-right">المدة المتوقعة</th>
                  <th className="border p-3 text-right">التكلفة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">دمياط الجديدة</td>
                  <td className="border p-3">نفس اليوم</td>
                  <td className="border p-3">مجانًا للطلبات فوق 5000 ج.م</td>
                </tr>
                <tr>
                  <td className="border p-3">منطقة دمياط</td>
                  <td className="border p-3">1-2 يوم</td>
                  <td className="border p-3">50 ج.م</td>
                </tr>
                <tr>
                  <td className="border p-3">المدن الرئيسية</td>
                  <td className="border p-3">2-3 أيام</td>
                  <td className="border p-3">75 ج.م</td>
                </tr>
                <tr>
                  <td className="border p-3">مناطق أخرى</td>
                  <td className="border p-3">3-4 أيام</td>
                  <td className="border p-3">100 ج.م</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Important Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">معلومات هامة</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <span className="font-semibold">معالجة الطلبات:</span> جميع الطلبات تتم معالجتها خلال 24 ساعة من تأكيد الدفع.
            </p>
            <p>
              <span className="font-semibold">التتبع:</span> سيتم إرسال رقم تتبع عبر الرسائل القصيرة والبريد الإلكتروني عند شحن طلبك.
            </p>
            <p>
              <span className="font-semibold">التأمين:</span> جميع الشحنات مؤمنة بالكامل ضد التلف أو الفقد أثناء النقل.
            </p>
          </div>
        </section>

        {/* Safety Measures */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">سلامة المنتجات</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">
              جميع أجهزة اللابتوب والإكسسوارات يتم تغليفها بعناية لضمان وصولها بأمان. نستخدم:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>مواد تغليف عالية الجودة</li>
              <li>بطانات ممتصة للصدمات</li>
              <li>أكياس محكمة الغلق ومضادة للماء</li>
              <li>صناديق خارجية قوية</li>
            </ul>
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">دعم الشحن</h2>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              لأي استفسار بخصوص الشحن أو تتبع طلبك:
            </p>
            <Link href="/contact">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                تواصل مع الدعم
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingInfo;
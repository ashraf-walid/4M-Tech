const TermsAndConditions = () => {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-blue-500 pb-4">
            الشروط والأحكام
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">1. المقدمة</h2>
              <p className="leading-relaxed">
                مرحبًا بكم في موقعنا. تحكم هذه الشروط والأحكام استخدامك للموقع وتوضح حقوقك ومسؤولياتك. باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط بالكامل.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">2. سياسة الاستخدام المقبول</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>الموقع للاستخدام الشخصي والمشروع فقط.</li>
                <li>يحظر القيام بأي أنشطة مسيئة أو تشهيرية.</li>
                <li>نحتفظ بالحق في تقييد الوصول في حال مخالفة الشروط.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">3. حقوق الملكية الفكرية</h2>
              <p className="leading-relaxed">
                جميع محتويات الموقع من نصوص وصور ورسومات وشعارات محمية بموجب قوانين حقوق النشر. يُحظر استخدام أو نسخ أو توزيع هذه المحتويات دون إذن.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">4. الخصوصية وأمان البيانات</h2>
              <p className="leading-relaxed">
                نلتزم بحماية معلوماتك الشخصية وفقًا لسياسة الخصوصية الخاصة بنا. لن يتم مشاركة بياناتك مع أي طرف ثالث دون موافقتك الصريحة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">5. حدود المسؤولية</h2>
              <p className="leading-relaxed">
                لا نتحمل أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة أو تبعية ناتجة عن استخدامك للموقع. المسؤولية محدودة بالحد الأقصى الذي يسمح به القانون.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">6. مسؤوليات المستخدم</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>يجب على المستخدمين تقديم معلومات دقيقة ومحدثة عند الطلب.</li>
                <li>أمان الحساب مسؤولية المستخدم؛ لا تشارك بيانات الدخول الخاصة بك.</li>
                <li>أي إساءة استخدام للموقع قد تؤدي إلى إنهاء الوصول.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">7. تعديلات على الشروط</h2>
              <p className="leading-relaxed">
                نحتفظ بالحق في تحديث هذه الشروط والأحكام في أي وقت. استمرارك في استخدام الموقع يعني موافقتك على الشروط المحدثة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">8. تواصل معنا</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">للاستفسارات والدعم:</p>
                <p>البريد الإلكتروني: support@ourcompany.com</p>
                <p>الهاتف: +966-555-123-456</p>
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

  export default TermsAndConditions;
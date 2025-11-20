import Link from 'next/link';

const ReturnsPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-black text-center text-gray-800 mb-10 border-b-4 border-green-500 pb-4">
                    سياسة الاسترجاع
                </h1>

                <div className="space-y-6 text-gray-700">
                    <p className="leading-relaxed">
                        نسعى لتقديم أفضل تجربة تسوق لعملائنا، ولهذا نقدم سياسة استرجاع مرنة وسهلة.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">شروط الاسترجاع</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>يجب إعادة المنتج خلال 14 يومًا من تاريخ الشراء.</li>
                            <li>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم، مع جميع البطاقات الملحقة.</li>
                            <li>يجب تقديم إيصال أو إثبات الشراء مع المنتج المراد إرجاعه.</li>
                            <li>بعض المنتجات غير قابلة للاسترجاع مثل المنتجات المخصصة أو المصنوعة حسب الطلب.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">منتجات غير قابلة للاسترجاع</h2>
                        <p className="leading-relaxed">
                            المنتجات التالية لا يمكن استرجاعها:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>المنتجات المباعة نهائيًا أو ضمن العروض والتصفية.</li>
                            <li>السلع القابلة للتلف مثل الأغذية والمشروبات.</li>
                            <li>البرمجيات أو الأقراص المدمجة أو أقراص DVD المفتوحة.</li>
                            <li>بطاقات الهدايا أو الرصيد الشرائي.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">إجراءات الاسترداد</h2>
                        <p className="leading-relaxed">
                            بعد استلامنا للمنتج المرتجع، سنقوم بفحصه وإبلاغك بحالة الاسترداد. إذا تمت الموافقة، سيتم إعادة المبلغ إلى وسيلة الدفع الأصلية خلال 5-7 أيام عمل.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">التواصل مع خدمة العملاء</h2>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="font-semibold mb-2">للاستفسارات والدعم بخصوص الاسترجاع:</p>
                            <p>البريد الإلكتروني: support@2MTechnology.com</p>
                            <p>الهاتف: 01000980788</p>
                            <p>
                                أو يمكنك زيارة <Link href="/contact" className="text-green-600 underline">صفحة الدعم</Link>.
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

export default ReturnsPolicy;
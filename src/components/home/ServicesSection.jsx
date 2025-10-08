import { Truck, Shield, Clock, CreditCard, Package, HeadphonesIcon } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'شحن مجاني',
    description: 'شحن مجاني للطلبات التي تزيد عن 1000 ج.م'
  },
  {
    icon: Shield,
    title: 'دفع آمن',
    description: 'معالجة الدفع آمنة بنسبة 100%'
  },
  {
    icon: Clock,
    title: 'دعم على مدار الساعة',
    description: 'خدمة العملاء متاحة 24/7'
  },
  {
    icon: CreditCard,
    title: 'إرجاع سهل',
    description: 'ضمان استرداد المال خلال 30 يوم'
  },
  {
    icon: Package,
    title: 'منتجات عالية الجودة',
    description: 'منتجات مميزة مختارة بعناية'
  },
  {
    icon: HeadphonesIcon,
    title: 'دعم فني متخصص',
    description: 'مساعدة فنية متاحة دائماً'
  }
];

export default function ServicesSection() {
  return (
    <section className="pb-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            خدماتنا المميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نقدم لك أفضل الخدمات لضمان تجربة تسوق مميزة ومريحة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 hover:border-blue-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:from-cyan-500 group-hover:to-emerald-500 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mr-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
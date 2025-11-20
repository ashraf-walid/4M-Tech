import { Truck, Clock } from 'lucide-react';

const shippingOptions = [
  {
    id: 'standard',
    name: 'توصيل عادي',
    description: '3-5 أيام عمل',
    price: 0,
    icon: Truck
  },
  {
    id: 'express',
    name: 'توصيل سريع',
    description: '1-2 أيام عمل',
    price: 50,
    icon: Clock
  }
];

export default function ShippingOptions({ selected, onSelect }) {
  return (
    <div className="space-y-3 border-t pt-4 mt-4 text-right">
      <h3 className="text-sm font-medium text-gray-700">طريقة الشحن</h3>
      
      <div className="space-y-2">
        {shippingOptions.map((option) => {
          const Icon = option.icon;
          return (
            <label
              key={option.id}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                selected === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => onSelect(option)}
                  className="hidden"
                />
                <Icon className={`w-5 h-5 ${
                  selected === option.id ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <div className="text-right">
                  <p className="font-medium text-gray-900">{option.name}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
              <span className={`font-medium ${
                option.price === 0 ? 'text-green-600' : 'text-gray-900'
              }`}>
                {option.price === 0 ? 'مجاني' : `${option.price} ج.م`}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
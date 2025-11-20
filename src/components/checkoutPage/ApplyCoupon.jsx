import { useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Tag, AlertCircle, CheckCircle } from 'lucide-react';

export default function ApplyCoupon({setCouponCode, couponCode, setDiscount, discount, isLoading, setIsLoading}) {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
        setMessage('يرجى إدخال كود الكوبون');
        setMessageType('error');
        return;
        }

        setIsLoading(true);
        setMessage('جاري التحقق من الكوبون...');
        setMessageType('info');
        setDiscount(null);

        try {
        const couponCollection = collection(db, 'coupons');
        const snapshot = await getDocs(couponCollection);
        
        if (snapshot.empty) {
            setMessage('لا توجد كوبونات متاحة حالياً');
            setMessageType('error');
            return;
        }

        const coupons = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
        
        const coupon = coupons.find(c => c.code === couponCode.trim());
        
        if (coupon) {
            if (!coupon.isActive) {
                setMessage('هذا الكوبون غير مفعل.');
                setMessageType('error');
                setIsLoading(false);
                return;
            }
            if (coupon.expiryDate) {
                const now = new Date();
                const expiry = new Date(coupon.expiryDate);
                if (now > expiry) {
                    setMessage('انتهت صلاحية هذا الكوبون.');
                    setMessageType('error');
                    setIsLoading(false);
                    return;
                }
            }
            setDiscount(coupon.discount);
            setMessage('تم تطبيق الكوبون بنجاح!');
            setMessageType('success');
        } else {
            setMessage('كود الكوبون غير صحيح. يرجى المحاولة مرة أخرى');
            setMessageType('error');
        }
        } catch (error) {
        console.error('Error checking coupon:', error);
        setMessage('حدث خطأ ما. يرجى المحاولة لاحقاً');
        setMessageType('error');
        } finally {
        setIsLoading(false);
        }
    };

    const messageStyles = {
        success: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: <CheckCircle className="w-5 h-5 text-green-500" />
        },
        error: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: <AlertCircle className="w-5 h-5 text-red-500" />
        },
        info: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        icon: <AlertCircle className="w-5 h-5 text-blue-500" />
        }
    };

    return (
        <div className="mt-6 space-y-4">
            <div className="flex flex-col space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">استخدم كوبون خصم</h2>
            <div className="flex gap-3">
            <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="أدخل كود الكوبون"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
                />
            </div>
            <button
                onClick={handleApplyCoupon}
                disabled={isLoading || !couponCode.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isLoading || !couponCode.trim()
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                {isLoading ? 'جاري التحقق...' : 'تطبيق'}
            </button>
            </div>
            </div>

            {message && (
                <div className={`mt-3 p-3 rounded-lg flex items-start gap-2 ${messageStyles[messageType].bg}`}>
                {messageStyles[messageType].icon}
                <div>
                    <p className={`text-sm ${messageStyles[messageType].text}`}>{message}</p>
                    {discount && (
                    <p className="text-sm font-semibold text-green-700 mt-1">
                        الخصم: {discount}%
                    </p>
                    )}
                </div>
                </div>
            )}
        </div>
    );
}
'use client';

import { useState, useEffect } from 'react';
import AddProduct from '@/app/dashboard/AddProduct';
import EditProductList from '@/app/dashboard/EditProductList';


// import { useRouter } from 'next/navigation';

import { 
  PackageSearch, 
  PackagePlus, 
  SquarePlus, 
  Headphones,
  ShoppingCart,
  Users,
  Ticket,
  User, 
  Logs
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('addProduct');
  const [isListOpen, setIsListOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const router = useRouter();

  // verifyAdmin
  // useEffect(() => {
  //   const verifyAdmin = async () => {
  //     if (!currentUser) return;

  //     const token = await currentUser.getIdToken();

  //     const res = await fetch('/api/check-admin', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!res.ok) {
  //       router.replace('/');
  //       return;
  //     }

  //     const data = await res.json();
  //     if (data.admin) {
  //       setAuthorized(true);
  //     } else {
  //       router.replace('/');
  //     }

  //     setLoading(false);
  //   };

  //   verifyAdmin();
  // }, [currentUser,router]);

  // if (loading) {
  //   console.log('جاري التحقق من الصلاحيات...');
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="text-center p-8 bg-white rounded-lg shadow-md">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600 text-lg font-medium">جاري التحقق من الصلاحيات...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!authorized) return null;

  const tabTitles = {
    ManageOrders: 'إدارة الطلبات',
    addProduct: 'إضافة منتج جديد',
    productManagement: 'إدارة المنتجات',
    addaccessory: 'إضافة ملحق جديد',
    MangeAccessories: 'إدارة الملحقات',
    CouponManagement: 'إدارة الكوبونات',
    AddUserAdmin: 'إدارة المستخدمين',
    BannerManagement: 'إدارة صور البانر'
  };

  const navItems = [
    {
      id: 'ManageOrders',
      label: 'إدارة الطلبات',
      icon: <ShoppingCart className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'addProduct',
      label: 'إضافة منتج',
      icon: <PackagePlus className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'productManagement',
      label: 'إدارة المنتجات',
      icon: <PackageSearch className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'addaccessory',
      label: 'إضافة ملحق',
      icon: <SquarePlus className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'MangeAccessories',
      label: 'إدارة الملحقات',
      icon: <Headphones className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'CouponManagement',
      label: 'إدارة الكوبونات',
      icon: <Ticket className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'AddUserAdmin',
      label: 'إدارة المستخدمين',
      icon: <Users className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'BannerManagement',
      label: 'إدارة صور البانر',
      icon: <SquarePlus className="w-5 h-5 text-blue-600" />
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      // case 'ManageOrders':
      //   return <ManageOrders />;
      case 'addProduct':
        return <AddProduct />;
      case 'productManagement':
        return <EditProductList />;
      // case 'addaccessory':
      //   return <AddAccessory />;
      // case 'MangeAccessories':
      //   return <LaptopAccessoriesManagement />;
      // case 'CouponManagement':
      //   return <CouponManagement />;
      // case 'AddUserAdmin':
      //   return <AddUserAdmin />;
      // case 'BannerManagement':
      //   return <BannerManagement />;
      default:
        return null;
    }
  };

  // if (!currentUser) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-gray-600">يرجى تسجيل الدخول للوصول إلى لوحة التحكم.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* الشريط الجانبي للشاشات الكبيرة */}
      <div className="w-56 bg-white shadow-lg p-2 min-h-screen max-sm:hidden">
        <div className="mb-8 mt-6 text-right">
          <h3 className="text-2xl font-bold text-gray-800">
            لوحة التحكم
          </h3>
          <div className="mt-2 h-1 w-20 bg-blue-500 rounded-full mr-auto"></div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="w-full shadow-lg flex justify-between items-center absolute sm:hidden px-4 py-2">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            لوحة التحكم
          </h3>
          <div className="mt-1 h-1 w-16 bg-blue-500 rounded-full"></div>
        </div>
        <Logs onClick={()=> setIsListOpen(!isListOpen)}/>
      </div>

      {/* الشريط الجانبي للشاشات الصغيرة */}
      {isListOpen &&
        <div className="w-full bg-white shadow-lg p-6 min-h-screen sm:hidden absolute mt-14 z-50 -top-1 text-right">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {setActiveTab(item.id); setIsListOpen(!isListOpen)} }
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      }
      
      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-8 max-sm:py-4 max-sm:px-0">
        {/* رأس لوحة التحكم */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex items-center justify-between max-sm:hidden">
          <h1 className="text-2xl font-semibold text-gray-800">
            {tabTitles[activeTab] || 'لوحة التحكم'}
          </h1>
          <div className="flex flex-row-reverse items-center gap-4">
            <div className="flex flex-row-reverse items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              {/* <span className="text-sm">{currentUser.email}</span> */}
            </div>
          </div>
        </div>

        {/* المحتوى الديناميكي */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-0 max-sm:mt-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}


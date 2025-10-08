import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import components with loading states
const HeroBanner = dynamic(() => import('@/components/home/HeroBanner'), {
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse" />
});

const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const LaptopsSection = dynamic(() => import('@/components/home/LaptopsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const Footer = dynamic(() => import('@/components/footer/Footer'), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-[600px] bg-gray-100 animate-pulse" />}>
        <HeroBanner />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <LaptopsSection />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

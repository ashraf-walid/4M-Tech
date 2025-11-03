
import CategorySection from "@/components/Home/CategorySection";
import SaleSection from "@/components/Home/SaleSection";
import NewsletterSection from "@/components/Home/NewsletterSection";
import NewProductSection from "@/components/Home/NewProductSection";
import BestSeller from "@/components/Home/BestSeller";

export default function Home() {
  return (
    <>
      <CategorySection />
      <NewProductSection />
      <SaleSection />
      <BestSeller />
      <NewsletterSection />
    </>
  )
}

import CategorySection from "@/components/Home/CategorySection";
import SaleSection from "@/components/Home/SaleSection";
import NewsletterSection from "@/components/Home/NewsletterSection";
import NewProductSection from "@/components/Home/NewProductSection";
import BestSeller from "@/components/Home/BestSeller";
import Header from "@/components/Header/index";
import Footer from "@/components/footer/Footer";

export default function Home() {

  return (
    <>
      <Header/>
      <CategorySection />
      <NewProductSection />
      <SaleSection />
      <BestSeller />
      <NewsletterSection />
      <Footer/>
    </>
  )
}
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import PopularPicks from '@/components/PopularPicks';
import SavingsScheme from '@/components/SavingsScheme';
import NewArrivals from '@/components/NewArrivals';
import Craftsmanship from '@/components/Craftsmanship';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <div className="py-12 md:py-16">
        <div className="w-[98%] mx-auto mb-14 md:mb-18">
          <CategorySection />
        </div>
        <div className="w-[98%] mx-auto mb-14 md:mb-18">
          <PopularPicks />
        </div>
        <div className="w-[88%] mx-auto mb-14 md:mb-18">
          <SavingsScheme />
        </div>
        <div className="w-[98%] mx-auto mb-14 md:mb-18">
          <NewArrivals />
        </div>
        <div className="mb-14 md:mb-18">
          <Craftsmanship />
        </div>
        <div className="w-[100%] mx-auto">
          <Testimonials />
        </div>
      </div>
      <Footer />
    </main>
  );
}

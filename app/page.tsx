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
      <div className="py-8 md:py-12">
        <CategorySection />
      </div>
      <div className="py-8 md:py-12">
        <PopularPicks />
      </div>
      <div className="py-8 md:py-12">
        <SavingsScheme />
      </div>
      <div className="py-8 md:py-12">
        <NewArrivals />
      </div>
      <div className="py-8 md:py-12">
        <Craftsmanship />
      </div>
      <Testimonials />
      <Footer />
    </main>
  );
}

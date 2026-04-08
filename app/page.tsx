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
      <CategorySection />
      <PopularPicks />
      <SavingsScheme />
      <NewArrivals />
      <Craftsmanship />
      <Testimonials />
      <Footer />
    </main>
  );
}

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryCarousel from '@/components/CategoryCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import SavingsScheme from '@/components/SavingsScheme';
import NewArrivals from '@/components/NewArrivals';
import Craftsmanship from '@/components/Craftsmanship';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  // Category data
  const categories = [
    { id: 1, name: 'Gold Necklaces', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=700&fit=crop&q=80' },
    { id: 2, name: 'Earrings', image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=500&h=700&fit=crop&q=80' },
    { id: 3, name: 'Bangles', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=700&fit=crop&q=80' },
    { id: 4, name: 'Silver', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&h=700&fit=crop&q=80' },
    { id: 5, name: 'Savings Plan', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=700&fit=crop&q=80' },
    { id: 6, name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=700&fit=crop&q=80' },
  ];

  // Popular products data
  const popularProducts = [
    { id: 1, name: 'Lakshmi Bridal Choker', price: '2,18,000', karat: '22KT Gold', slug: 'lakshmi-bridal-choker', category: 'necklace', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80' },
    { id: 2, name: 'Temple Jhumka Pair', price: '86,500', karat: '22KT Gold', slug: 'temple-jhumka-pair', category: 'gold-jhumkas', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&q=80' },
    { id: 3, name: 'Silver Pooja Gift Set', price: '14,800', karat: '999 Silver', slug: 'silver-pooja-gift-set', category: 'all', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&q=80' },
    { id: 4, name: 'Festival Gold Coin', price: '39,950', karat: '24KT Gold', slug: 'festival-gold-coin', category: 'all', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=600&fit=crop&q=80' },
    { id: 5, name: 'Diamond Pendant Set', price: '1,45,000', karat: '18KT Gold', slug: 'diamond-pendant-set', category: 'necklace', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&q=80' },
    { id: 6, name: 'Antique Bangle Set', price: '95,000', karat: '22KT Gold', slug: 'antique-bangle-set', category: 'bangles', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop&q=80' },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
      <Header />
      <Hero />
      <div className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 overflow-x-hidden w-full">
        <div className="w-[98%] mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-18">
          <CategoryCarousel
            title="Shop by Category"
            subtitle="Traditional favourites and everyday essentials curated for Indian families"
            categories={categories}
            autoplayDelay={4000}
          />
        </div>
        <div className="w-[98%] mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-18">
          <ProductCarousel
            title="Popular Picks"
            subtitle="Most-loved pieces from our gold and silver collections"
            items={popularProducts}
            autoplayDelay={4000}
          />
        </div>
        <div className="w-[98%] xs:w-[95%] sm:w-[92%] md:w-[88%] mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-18">
          <SavingsScheme />
        </div>
        <div className="w-[98%] mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-18">
          <NewArrivals />
        </div>
        <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-18">
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

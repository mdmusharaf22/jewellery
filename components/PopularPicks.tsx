import Image from 'next/image';

export default function PopularPicks() {
  const products = [
    { 
      id: 1, 
      name: 'Lakshmi Bridal Choker', 
      price: '2,18,000', 
      karat: '22KT Gold',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 2, 
      name: 'Temple Jhumka Pair', 
      price: '86,500', 
      karat: '22KT Gold',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 3, 
      name: 'Silver Pooja Gift Set', 
      price: '14,800', 
      karat: '999 Silver',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 4, 
      name: 'Festival Gold Coin', 
      price: '39,950', 
      karat: '24KT Gold',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=600&fit=crop&q=80'
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1a1a1a]">
          Popular Picks
        </h2>
        <p className="text-center text-gray-600 mb-12 md:mb-16 text-sm md:text-base">
          Most-loved pieces from our gold and silver collections
        </p>
      </div>

      {/* Full width grid without container padding */}
      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="cursor-pointer"
            >
              {/* Product Image with Heart Icon - No card wrapper */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Heart/Wishlist Button */}
                <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Product Details - Direct on background */}
              <div>
                <p className="text-xs text-gray-500 mb-1">{product.karat}</p>
                <h3 className="font-semibold text-base mb-2 text-[#1a1a1a]">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-[#1a1a1a]">₹ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

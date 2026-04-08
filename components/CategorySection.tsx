import Image from 'next/image';

export default function CategorySection() {
  const categories = [
    { 
      name: 'Gold Necklaces', 
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Earrings', 
      image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Bangles', 
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Silver', 
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Savings Plan', 
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=700&fit=crop&q=80'
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1a1a1a]">
          Shop by Category
        </h2>
        <p className="text-center text-gray-600 mb-12 md:mb-16 text-sm md:text-base">
          Traditional favourites and everyday essentials curated for Indian families
        </p>
      </div>

      {/* Full width grid without container padding */}
      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="cursor-pointer"
            >
              {/* Subtle rounded top corners */}
              <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-t-[170px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <h3 className="text-center font-semibold text-[#1a1a1a] text-sm md:text-base">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

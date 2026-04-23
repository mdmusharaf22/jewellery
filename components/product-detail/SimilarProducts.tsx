import Image from 'next/image';
import Link from 'next/link';

interface SimilarProductsProps {
  currentProductSlug: string;
  category: string;
}

export default function SimilarProducts({ currentProductSlug, category }: SimilarProductsProps) {
  // Mock similar products - replace with API call
  const similarProducts = [
    { id: 13, slug: 'temple-jhumka-pair', name: 'Temple Jhumka Pair', price: 86500, karat: '22KT GOLD', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
    { id: 14, slug: 'antique-lakshmi-haram', name: 'Antique Lakshmi Haram', price: 412000, karat: '22KT GOLD', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
    { id: 15, slug: 'traditional-vanki', name: 'Traditional Vanki', price: 145000, karat: '22KT GOLD', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400' },
    { id: 16, slug: 'kada-bangle-set', name: 'Kada Bangle Set', price: 215500, karat: '22KT GOLD', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
  ];

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">Similar Designs</h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Discover complementary pieces and similar styles to complete your look.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
        {similarProducts.map((product) => (
          <Link 
            key={product.id} 
            href={`/${category}/${product.slug}`}
            className="group"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2 sm:mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                unoptimized
              />
            </div>
            <p className="text-[10px] xs:text-xs text-[#B8941E] font-medium mb-0.5 sm:mb-1">{product.karat}</p>
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#B8941E] transition text-xs sm:text-sm md:text-base line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
              ₹ {product.price.toLocaleString('en-IN')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

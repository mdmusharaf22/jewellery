import ProductCardSkeleton from './ProductCardSkeleton';

interface ProductCarouselSkeletonProps {
  title?: string;
  subtitle?: string;
}

export default function ProductCarouselSkeleton({ title, subtitle }: ProductCarouselSkeletonProps) {
  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto px-2 xs:px-3 sm:px-4 lg:px-8 max-w-[100vw]">
        {title && (
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 xs:mb-3 text-[#1a1a1a]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-center text-gray-600 mb-6 xs:mb-8 md:mb-10 text-[11px] xs:text-xs sm:text-sm md:text-base px-2">
            {subtitle}
          </p>
        )}
      </div>

      <div className="px-2 xs:px-3 sm:px-4 lg:px-8 max-w-[100vw] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

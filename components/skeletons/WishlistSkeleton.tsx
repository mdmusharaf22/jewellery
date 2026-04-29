import ProductCardSkeleton from './ProductCardSkeleton';

export default function WishlistSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8 animate-pulse">
      {/* Header */}
      <div className="h-6 bg-gray-200 rounded w-32 mb-3 xs:mb-4 sm:mb-5 md:mb-6" />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProductDetailSkeleton() {
  return (
    <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4 py-4 xs:py-6 sm:py-8 max-w-[100vw] animate-pulse">
      <div className="lg:flex lg:gap-4 xl:gap-6 2xl:gap-8 mb-6 sm:mb-8">
        {/* Left: Image Gallery Skeleton */}
        <div className="lg:w-1/2">
          <div className="lg:sticky lg:top-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Info Skeleton */}
        <div className="lg:w-1/2 mt-6 lg:mt-0 space-y-4">
          {/* Karat */}
          <div className="h-4 bg-gray-200 rounded w-24" />
          
          {/* Product Name */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-full" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
          </div>
          
          {/* Price */}
          <div className="h-10 bg-gray-200 rounded w-40" />
          
          {/* Description */}
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          
          {/* Purity Options */}
          <div className="pt-4">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-20" />
              ))}
            </div>
          </div>
          
          {/* Length Options */}
          <div className="pt-4">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-16" />
              ))}
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <div className="h-12 bg-gray-200 rounded flex-1" />
            <div className="h-12 w-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Additional Sections Skeleton */}
      <div className="space-y-8">
        <div className="border-t border-gray-200 pt-8">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

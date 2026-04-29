export default function CartSkeleton() {
  return (
    <div className="bg-gray-50 py-6 xs:py-8 sm:py-10 md:py-12 pb-8 xs:pb-10 sm:pb-12 md:pb-16 animate-pulse">
      <div className="w-[90%] mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 xs:mb-5 sm:mb-6">
          <div className="h-4 bg-gray-200 rounded w-40" />
        </div>

        {/* Title Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 xs:mb-6 sm:mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6">
                <div className="flex gap-3 xs:gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-gray-200 rounded flex-shrink-0" />
                  
                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded" />
                        <div className="w-12 h-8 bg-gray-200 rounded" />
                        <div className="w-8 h-8 bg-gray-200 rounded" />
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 xs:p-5 sm:p-6 sticky top-4">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4 xs:mb-5 sm:mb-6" />
              
              <div className="space-y-3 xs:space-y-3.5 sm:space-y-4 mb-4 xs:mb-5 sm:mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                ))}
              </div>

              <div className="h-12 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

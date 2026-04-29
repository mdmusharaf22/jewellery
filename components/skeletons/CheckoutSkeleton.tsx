export default function CheckoutSkeleton() {
  return (
    <div className="bg-gray-50 py-6 xs:py-8 sm:py-10 md:py-12 pb-8 xs:pb-10 sm:pb-12 md:pb-16 animate-pulse">
      <div className="w-[90%] mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 xs:mb-5 sm:mb-6">
          <div className="h-4 bg-gray-200 rounded w-48" />
        </div>

        {/* Title Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-32 mb-4 xs:mb-6 sm:mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Form Section Skeleton */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-4 xs:p-5 sm:p-6">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                    <div className="h-10 bg-gray-200 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-4 xs:p-5 sm:p-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 xs:p-5 sm:p-6 sticky top-4">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              
              {/* Items */}
              <div className="space-y-3 mb-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="h-12 bg-gray-200 rounded w-full mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

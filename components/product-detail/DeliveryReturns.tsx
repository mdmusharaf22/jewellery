import { Package, Store, RefreshCw } from 'lucide-react';

export default function DeliveryReturns() {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">Delivery & Returns</h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Shipping, store pickup and exchange information presented as clear standalone sections instead of tabs for easier browsing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Insured Delivery */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#B8941E]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Insured delivery across India</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Orders above ₹50,000 include free insured shipping. Dispatch usually happens within 2–4 business days for ready products.
          </p>
        </div>

        {/* Store Visit */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Store className="w-5 h-5 sm:w-6 sm:h-6 text-[#B8941E]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Store visit & pickup available</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Reserve this design online and complete your purchase in-store with personalized assistance, fitting and product verification.
          </p>
        </div>

        {/* Returns & Exchange */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-[#B8941E]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">15-day return and lifetime exchange</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Eligible products can be returned within 15 days. Lifetime exchange is available according to prevailing gold rate and store policy.
          </p>
        </div>
      </div>
    </div>
  );
}

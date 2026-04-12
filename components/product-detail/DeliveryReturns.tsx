import { Package, Store, RefreshCw } from 'lucide-react';

export default function DeliveryReturns() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery & Returns</h2>
      <p className="text-gray-600 mb-8">
        Shipping, store pickup and exchange information presented as clear standalone sections instead of tabs for easier browsing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Insured Delivery */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-[#B8941E]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Insured delivery across India</h3>
          <p className="text-sm text-gray-600">
            Orders above ₹50,000 include free insured shipping. Dispatch usually happens within 2–4 business days for ready products.
          </p>
        </div>

        {/* Store Visit */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center mb-4">
            <Store className="w-6 h-6 text-[#B8941E]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Store visit & pickup available</h3>
          <p className="text-sm text-gray-600">
            Reserve this design online and complete your purchase in-store with personalized assistance, fitting and product verification.
          </p>
        </div>

        {/* Returns & Exchange */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 text-[#B8941E]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">15-day return and lifetime exchange</h3>
          <p className="text-sm text-gray-600">
            Eligible products can be returned within 15 days. Lifetime exchange is available according to prevailing gold rate and store policy.
          </p>
        </div>
      </div>
    </div>
  );
}

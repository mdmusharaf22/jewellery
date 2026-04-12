interface PriceBreakupProps {
  priceBreakup: {
    goldValue: number;
    makingCharges: number;
    gemstoneValue: number;
    wastage: number;
    gst: number;
    total: number;
  };
}

export default function PriceBreakup({ priceBreakup }: PriceBreakupProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Price Breakup</h2>
      <p className="text-gray-600 mb-8">
        A transparent cost summary with gold value, making charges and stones, so customers can understand the full pricing clearly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Price Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">Gold Value (42.850 g)</span>
            <span className="font-medium text-gray-900">₹ {priceBreakup.goldValue.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">Making Charges</span>
            <span className="font-medium text-gray-900">₹ {priceBreakup.makingCharges.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">Gemstone Value</span>
            <span className="font-medium text-gray-900">₹ {priceBreakup.gemstoneValue.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">Wastage & finishing</span>
            <span className="font-medium text-gray-900">₹ {priceBreakup.wastage.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">GST</span>
            <span className="font-medium text-gray-900">₹ {priceBreakup.gst.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-4 border-t-2 border-gray-300">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">₹ {priceBreakup.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Pricing Notes */}
        <div className="bg-[#FFF8E7] p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Pricing Notes</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Final price may vary slightly based on live gold rate, exact finished weight and any custom changes requested for gemstones or length. The displayed value includes all taxes and standard craftsmanship charges.
          </p>
        </div>
      </div>
    </div>
  );
}

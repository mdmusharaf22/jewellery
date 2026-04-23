interface ProductDetailsProps {
  productInfo: {
    code: string;
    type: string;
    occasion: string;
    collection: string;
  };
  metalDimensions: {
    metalColor: string;
    purity: string;
    grossWeight: string;
    netWeight: string;
    length: string;
  };
}

export default function ProductDetails({ productInfo, metalDimensions }: ProductDetailsProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">Product Details</h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        Everything you need to know about this handcrafted bridal piece, including materials, dimensions and collection information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
        {/* Product Information */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Product Information</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Product Code</span>
              <span className="font-medium text-gray-900">{productInfo.code}</span>
            </div>
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Product Type</span>
              <span className="font-medium text-gray-900">{productInfo.type}</span>
            </div>
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Occasion</span>
              <span className="font-medium text-gray-900">{productInfo.occasion}</span>
            </div>
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Collection</span>
              <span className="font-medium text-gray-900">{productInfo.collection}</span>
            </div>
          </div>
        </div>

        {/* Metal & Dimensions */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Metal & Dimensions</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Metal Color</span>
              <span className="font-medium text-gray-900">{metalDimensions.metalColor}</span>
            </div>
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Purity</span>
              <span className="font-medium text-gray-900">{metalDimensions.purity}</span>
            </div>
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Gross Weight</span>
              <span className="font-medium text-gray-900">{metalDimensions.grossWeight}</span>
            </div>
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Net Weight</span>
              <span className="font-medium text-gray-900">{metalDimensions.netWeight}</span>
            </div>
            <div className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
              <span className="text-gray-600">Length</span>
              <span className="font-medium text-gray-900">{metalDimensions.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductDetailsProps {
  productInfo: {
    [key: string]: string | undefined;
  };
  metalDimensions: {
    [key: string]: string | undefined;
  };
  features?: Array<{ key: string; value: string }>;
  information?: Array<{ key: string; value: string }>;
}

export default function ProductDetails({ productInfo, metalDimensions, features = [], information = [] }: ProductDetailsProps) {
  // Combine productInfo with additional information from API
  const allProductInfo = { ...productInfo };
  information.forEach(info => {
    if (!allProductInfo[info.key]) {
      allProductInfo[info.key] = info.value;
    }
  });

  // Combine metalDimensions with features from API
  const allMetalDimensions = { ...metalDimensions };
  features.forEach(feature => {
    if (!allMetalDimensions[feature.key]) {
      allMetalDimensions[feature.key] = feature.value;
    }
  });

  // Filter out undefined values
  const filteredProductInfo = Object.entries(allProductInfo).filter(([_, value]) => value !== undefined);
  const filteredMetalDimensions = Object.entries(allMetalDimensions).filter(([_, value]) => value !== undefined);

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
            {filteredProductInfo.map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
                <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metal & Dimensions */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Metal & Dimensions</h3>
          <div className="space-y-3 sm:space-y-4">
            {filteredMetalDimensions.map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base">
                <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

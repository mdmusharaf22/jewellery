export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-3 xs:p-4 space-y-2 xs:space-y-3">
        {/* Karat */}
        <div className="h-3 bg-gray-200 rounded w-16" />
        
        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-24" />
        
        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-gray-200 rounded flex-1" />
          <div className="h-9 w-9 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 md:mb-6">
        <div className="h-6 bg-gray-200 rounded w-40" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>

      {/* Form Fields */}
      <div className="space-y-3 xs:space-y-3.5 sm:space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

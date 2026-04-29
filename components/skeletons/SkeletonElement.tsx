/**
 * Generic skeleton element component
 * Can be used to build custom skeletons quickly
 */

interface SkeletonElementProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function SkeletonElement({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  variant = 'rectangular'
}: SkeletonElementProps) {
  const baseClasses = 'bg-gray-200 animate-pulse';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${width} ${height} ${className}`}
    />
  );
}

'use client';

import { Search, Grid, List } from 'lucide-react';

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ProductSearch({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}: ProductSearchProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Controls */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B8941E] cursor-pointer"
        >
          <option value="featured">Sort By: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>

        {/* View Toggle */}
        <div className="flex gap-2 border border-gray-300 rounded-lg p-1 ml-auto">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded transition ${
              viewMode === 'grid'
                ? 'bg-[#B8941E] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Grid View"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded transition ${
              viewMode === 'list'
                ? 'bg-[#B8941E] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

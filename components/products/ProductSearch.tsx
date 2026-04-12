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
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Search Bar */}
      <div className="relative flex-1 w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8941E] focus:border-transparent"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
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
        <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
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

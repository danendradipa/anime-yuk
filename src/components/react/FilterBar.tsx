import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  type: string;
  status: string;
  rating: string;
  orderBy: string;
  sort: string;
}

const TYPES: FilterOption[] = [
  { label: 'All Types', value: '' },
  { label: 'TV', value: 'tv' },
  { label: 'Movie', value: 'movie' },
  { label: 'OVA', value: 'ova' },
  { label: 'Special', value: 'special' },
  { label: 'ONA', value: 'ona' },
];

const STATUSES: FilterOption[] = [
  { label: 'All Status', value: '' },
  { label: 'Airing', value: 'airing' },
  { label: 'Complete', value: 'complete' },
  { label: 'Upcoming', value: 'upcoming' },
];

const RATINGS: FilterOption[] = [
  { label: 'All Ratings', value: '' },
  { label: 'G - All Ages', value: 'g' },
  { label: 'PG - Children', value: 'pg' },
  { label: 'PG-13 - Teens 13+', value: 'pg13' },
  { label: 'R - 17+', value: 'r17' },
  { label: 'R+ - Mild Nudity', value: 'r' },
];

const ORDER_BY: FilterOption[] = [
  { label: 'Score', value: 'score' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Favorites', value: 'favorites' },
  { label: 'Title', value: 'title' },
  { label: 'Start Date', value: 'start_date' },
];

const SORT: FilterOption[] = [
  { label: 'Descending', value: 'desc' },
  { label: 'Ascending', value: 'asc' },
];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: '',
    status: '',
    rating: '',
    orderBy: 'score',
    sort: 'desc',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      type: '',
      status: '',
      rating: '',
      orderBy: 'score',
      sort: 'desc',
    };
    setFilters(defaultFilters);
    
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  const activeFilterCount = [filters.type, filters.status, filters.rating].filter(Boolean).length;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-300 hover:text-white font-medium"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
            >
              {TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
            >
              {STATUSES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
            >
              {RATINGS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Order By</label>
            <select
              value={filters.orderBy}
              onChange={(e) => handleFilterChange('orderBy', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
            >
              {ORDER_BY.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Sort</label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
            >
              {SORT.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

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
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-800 dark:bg-gray-900">
      
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
          
          <ChevronDown 
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 gap-4 border-t border-gray-100 p-4 dark:border-gray-800 sm:grid-cols-2 lg:grid-cols-5">
          
          <FilterGroup 
            label="Type" 
            value={filters.type} 
            onChange={(val) => handleFilterChange('type', val)} 
            options={TYPES} 
          />
          
          <FilterGroup 
            label="Status" 
            value={filters.status} 
            onChange={(val) => handleFilterChange('status', val)} 
            options={STATUSES} 
          />
          
          <FilterGroup 
            label="Rating" 
            value={filters.rating} 
            onChange={(val) => handleFilterChange('rating', val)} 
            options={RATINGS} 
          />
          
          <FilterGroup 
            label="Order By" 
            value={filters.orderBy} 
            onChange={(val) => handleFilterChange('orderBy', val)} 
            options={ORDER_BY} 
          />
          
          <FilterGroup 
            label="Sort" 
            value={filters.sort} 
            onChange={(val) => handleFilterChange('sort', val)} 
            options={SORT} 
          />

        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, value, onChange, options }: { 
  label: string, 
  value: string, 
  onChange: (val: string) => void, 
  options: FilterOption[] 
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full appearance-none rounded-lg border px-3 py-2 text-sm font-medium outline-none transition-all
            
            /* Light Mode */
            bg-gray-50 border-gray-200 text-gray-900
            hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            
            /* Dark Mode */
            dark:bg-gray-800 dark:border-gray-700 dark:text-white
            dark:hover:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-900/30
          "
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
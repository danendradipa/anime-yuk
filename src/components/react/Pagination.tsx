import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  baseUrl: string;
}

export default function Pagination({ 
  currentPage, 
  lastPage, 
  hasNextPage, 
  baseUrl 
}: PaginationProps) {
  
  const generatePageUrl = (page: number) => {
    const url = new URL(baseUrl, window.location.origin);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    return `${url.pathname}?${searchParams.toString()}`;
  };

  const showPages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (lastPage <= maxVisible) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', lastPage);
    } else if (currentPage >= lastPage - 2) {
      pages.push(1, '...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage);
    }
    
    return pages;
  };

  const pages = showPages();

  if (lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <a
          href={generatePageUrl(currentPage - 1)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </a>
      ) : (
        <div className="px-4 py-2 bg-gray-900 text-gray-600 rounded-lg cursor-not-allowed flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" />
          Previous
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) => (
          typeof page === 'number' ? (
            <a
              key={index}
              href={generatePageUrl(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {page}
            </a>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          )
        ))}
      </div>

      {/* Next Button */}
      {hasNextPage ? (
        <a
          href={generatePageUrl(currentPage + 1)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </a>
      ) : (
        <div className="px-4 py-2 bg-gray-900 text-gray-600 rounded-lg cursor-not-allowed flex items-center gap-2">
          Next
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
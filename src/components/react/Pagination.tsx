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
    // Pastikan window tersedia (client-side)
    if (typeof window === 'undefined') return '#';

    const url = new URL(baseUrl, window.location.origin);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    return `${url.pathname}?${searchParams.toString()}`;
  };

  const showPages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Jumlah halaman maksimal yang tampil sebelum dipotong '...'
    
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

  // Class dasar untuk tombol agar tidak redundan
  const baseBtnClass = "flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200";
  const activeBtnClass = "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400";
  const disabledBtnClass = "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-600";

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
      
      {currentPage > 1 ? (
        <a
          href={generatePageUrl(currentPage - 1)}
          className={`${baseBtnClass} ${activeBtnClass}`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Prev</span>
        </a>
      ) : (
        <span className={`${baseBtnClass} ${disabledBtnClass}`}>
          <ChevronLeft className="h-4 w-4" />
          <span>Prev</span>
        </span>
      )}

      <div className="hidden items-center gap-2 sm:flex">
        {pages.map((page, index) => (
          typeof page === 'number' ? (
            <a
              key={index}
              href={generatePageUrl(page)}
              className={`
                flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-all
                ${page === currentPage
                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm dark:border-blue-500 dark:bg-blue-500' // Active Page
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400' // Inactive Page
                }
              `}
            >
              {page}
            </a>
          ) : (
            <span key={index} className="px-1 text-gray-400 dark:text-gray-600">
              ...
            </span>
          )
        ))}
      </div>

      <span className="flex items-center px-2 text-sm font-medium text-gray-600 dark:text-gray-400 sm:hidden">
        Page {currentPage} of {lastPage}
      </span>

      {hasNextPage ? (
        <a
          href={generatePageUrl(currentPage + 1)}
          className={`${baseBtnClass} ${activeBtnClass}`}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      ) : (
        <span className={`${baseBtnClass} ${disabledBtnClass}`}>
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  initialQuery = "",
  onSearch,
  placeholder = "Search anime...",
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      setIsSearching(true);

      if (onSearch) {
        onSearch(query.trim());
      } else {
        window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="
            w-full pl-11 pr-12 py-3 rounded-xl border transition-all duration-200 outline-none
            bg-white text-gray-900 border-gray-200 placeholder-gray-400
            focus:border-blue-500 focus:ring-4 focus:ring-blue-50
            dark:bg-gray-900 dark:text-white dark:border-gray-800 dark:placeholder-gray-500
            dark:focus:border-blue-500 dark:focus:ring-blue-900/30
          "
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-400 text-center">
        Press Enter to search or{" "}
        <button
          type="submit"
          disabled={!query.trim() || isSearching}
          className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          click here
        </button>
      </div>
    </form>
  );
}

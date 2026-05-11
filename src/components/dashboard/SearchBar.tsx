'use client';

import { Search, X } from 'lucide-react';
import { useApplicantStore } from '@/store/StoreContext';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const setSearch = useApplicantStore((s) => s.setSearch);
  const currentSearch = useApplicantStore((s) => s.search);
  const [localValue, setLocalValue] = useState(currentSearch);
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  const handleClear = () => {
    setLocalValue('');
    setSearch('');
  };

  return (
    <div className="relative flex-1 min-w-0">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <Input
        id="search-applicants"
        type="text"
        placeholder="Search by name, email, or college…"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-10 pr-10"
        aria-label="Search applicants"
      />
      {localValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-600"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}


import { useEffect, useState } from "react";

export function SearchBar({
  onSearch,
  placeholder = "Search...",
}: {
  onSearch: (term: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");

  // small debounce (300ms)
  useEffect(() => {
    const id = window.setTimeout(() => onSearch(value), 300);
    return () => window.clearTimeout(id);
  }, [value, onSearch]);

  return (
    <div className="w-full sm:w-96">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-gray-800 transition focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

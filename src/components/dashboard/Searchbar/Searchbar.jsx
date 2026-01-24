import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl h-9 sm:h-10 rounded-full bg-neutral-900 border border-neutral-700 overflow-hidden"
    >
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 min-w-0 px-5 bg-transparent outline-none"
      />
      <button type="submit" className="px-3 sm:px-4" aria-label="Search">
        <CiSearch className="text-xl" />
      </button>
    </form>
  );
};

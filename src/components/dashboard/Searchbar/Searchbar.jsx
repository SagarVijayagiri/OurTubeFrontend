/*import { useState } from "react";
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
};*/
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io"; // Added for the clear button

export const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleClear = () => {
    setQuery("");
    // Optional: if you want clearing the input to immediately reset the search results, uncomment the next line:
    // onSearch(""); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-2xl h-10 sm:h-11 rounded-full bg-[#1a1a20] border border-[#3a3a45] overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] group"
    >
      {/* Input Field */}
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder="Search for videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 min-w-0 px-5 sm:px-6 bg-transparent outline-none text-white placeholder-[#5a5a65] text-sm sm:text-base font-medium"
      />

      {/* Dynamic Clear Button - Only shows when there is text */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="px-3 text-[#5a5a65] hover:text-white transition-colors outline-none"
          aria-label="Clear search"
        >
          <IoMdClose className="text-xl" />
        </button>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        className="h-full px-5 sm:px-6 bg-[#22222a] border-l border-[#3a3a45] text-[#8a8a93] group-focus-within:text-teal-400 hover:text-white hover:bg-[#2a2a35] transition-colors flex items-center justify-center outline-none" 
        aria-label="Search"
      >
        <CiSearch className="text-2xl" strokeWidth={1} />
      </button>
    </form>
  );
};

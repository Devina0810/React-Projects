import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") onSearch(query);
  };

  return (
    <div className="search-container">
      <input
        className="seach-bar" id="search-bar"
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button id="button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

import React, { useState, useRef, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Button from '../components/Button';

const SearchBar = ({ onSearch, history, onRemoveSuggestion }) => {
  const [search, setSearch] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setFilteredSuggestions(
      history.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, history]);

  const handleSearch = () => {
    onSearch(search);
    setSearch('');
    setIsFocused(false);
    searchRef.current.blur();
  };

  const handleKeySearch = (e) => {
    if (e.key === 'Tab' && filteredSuggestions.length > 0) {
      e.preventDefault();
      setSearch(filteredSuggestions[0]);
      setIsFocused(false);
    }
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4 relative">
      <input
        ref={searchRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm theo từ khóa"
        className="w-full outline-second focus:border-blue-500 px-4 py-2 rounded"
        onKeyDown={handleKeySearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow-md rounded mt-2 z-50">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <span onClick={() => setSearch(suggestion)} className="flex-1">
                {suggestion}
              </span>
              <span onClick={() => onRemoveSuggestion(index)}>
                <IoClose size={24} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <Button
        label="Tìm kiếm"
        onClick={handleSearch}
        icon={<FiSearch size={24} color="white" />}
        iconPosition="left"
      />
    </div>
  );
};

export default SearchBar;
import React from 'react';

const FilterBar = ({ filters, setFilters, clearFilter }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Optional: auto-filter on Enter
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <input
          type="text"
          id="fromYear"
          placeholder="Year"
          value={filters.fromYear}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <span className="year-separator">to</span>
        <input
          type="text"
          id="toYear"
          placeholder="Year"
          value={filters.toYear}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <input
        type="text"
        id="tag"
        placeholder="Tag"
        value={filters.tag}
        className="spaced-input"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <input
        type="text"
        id="culture"
        placeholder="Culture"
        value={filters.culture}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      <button onClick={() => setFilters({ ...filters })}>Search</button>
      <button onClick={clearFilter}>Clear</button>
    </div>
  );
};

export default FilterBar;

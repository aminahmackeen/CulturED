// src/pages/ExplorePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import YearRow from '../components/YearRow';
import storiesData from '../data/stories.json';
import '../index.css';

const ExplorePage = () => {
  const [filters, setFilters] = useState({
    fromYear: '',
    toYear: '',
    tag: '',
    culture: ''
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    applyFilter();
  }, [filters]);

  const applyFilter = () => {
    const { fromYear, toYear, tag, culture } = filters;
    const from = parseInt(fromYear);
    const to = parseInt(toYear);
  
    const filteredStories = storiesData.filter(story => {
      const year = parseInt(story.year);
      const tagList = story.tags.map(t => t.trim().toLowerCase());
      const tagMatch = !tag || tagList.some(t => t.includes(tag.toLowerCase()));
      const cultureMatch = !culture || story.culture.toLowerCase().includes(culture.toLowerCase());
  
      const inRange =
        (!fromYear && !toYear) ||
        (fromYear && toYear && year >= from && year <= to) ||
        (fromYear && !toYear && year === from) ||
        (!fromYear && toYear && year === to);
  
      return tagMatch && cultureMatch && inRange;
    });
  
    // Group by year
    const grouped = {};
    filteredStories.forEach(story => {
      if (!grouped[story.year]) {
        grouped[story.year] = [];
      }
      grouped[story.year].push(story);
    });
  
    // Convert grouped object to array
    const result = Object.entries(grouped).map(([year, stories]) => ({
      year,
      stories
    }));
  
    // Sort by year descending (optional)
    result.sort((a, b) => b.year - a.year);
  
    setFilteredData(result);
  };
  

  const clearFilter = () => {
    setFilters({ fromYear: '', toYear: '', tag: '', culture: '' });
  };

  return (
    <div>
      <Header />
      <FilterBar filters={filters} setFilters={setFilters} clearFilter={clearFilter} />
      <div id="exploreContainer">
        {filteredData.map(data => (
          <YearRow key={data.year} year={data.year} stories={data.stories} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;

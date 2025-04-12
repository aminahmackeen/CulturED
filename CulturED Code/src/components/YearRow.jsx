import React from 'react';
import StoryCard from './StoryCard';

const YearRow = ({ year, stories }) => {
  return (
    <div className="year-row" data-year={year}>
      <div className="year-label">{year}</div>
      <div className="card-container">
        {stories.map((story, index) => (
          <StoryCard key={index} title={story.title} tag={story.tag} culture={story.culture} />
        ))}
      </div>
    </div>
  );
};

export default YearRow;

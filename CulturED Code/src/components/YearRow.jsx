import React from 'react';
import { Link } from 'react-router-dom';
import StoryCard from './StoryCard';

const YearRow = ({ year, stories }) => {
  return (
    <div className="year-row" data-year={year}>
      <div className="year-label">{year}</div>
      <div className="card-container">
        {stories.map((story, index) => (
          <Link key={index} to={`/story/${story.id}`} style={{ textDecoration: 'none' }}>
            <StoryCard
              title={story.title}
              tag={story.tag}
              culture={story.culture}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default YearRow;

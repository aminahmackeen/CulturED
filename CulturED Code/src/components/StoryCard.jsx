import React from 'react';

const StoryCard = ({ title, tag, culture }) => {
  return (
    <div className="card" data-tag={tag} data-culture={culture}>
      {title}
    </div>
  );
};

export default StoryCard;

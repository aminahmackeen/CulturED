// src/pages/StoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';

const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const storyRef = ref(db, `stories/${id}`);
    get(storyRef).then(snapshot => {
      if (snapshot.exists()) {
        setStory(snapshot.val());
      }
    });
  }, [id]);

  if (!story) return <p>Loading...</p>;

  return (
    <div className="story-detail">
      <button onClick={() => navigate('/explorepage')} style={{ marginBottom: '1rem' }}>
        ← Back to Explore
      </button>
      <h1>{story.title}</h1>
      <h3>{story.culture}, {story.year}</h3>
      <h4>{story.anonymous ? 'Anonymous' : story.author || 'Unknown'}</h4>
      <p>{story.story}</p>
      <div className="tag-list">
        {story.tags?.map((tag, idx) => (
          <span key={idx} className="tag">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default StoryPage;

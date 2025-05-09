import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ref, get, child } from 'firebase/database';
import { db } from '../firebase';

const CommunityBoard = () => {
    const { id } = useParams();         // get id of current community
    const navigate = useNavigate();
    const [communityName, setCommunityName] = useState("Community Name...");
    const [stories, setStories] = useState([]);
    
    useEffect(() => {
        const fetchCommunityAndStory = async () => {
            try {
                const dbRef = ref(db);
                const communitySnap = await get(child(dbRef, `communities/${id}`));     // fetches community info from the db
                const storySnap = await get(child(dbRef, "stories"));                   // fetches stories from the db

                if (communitySnap.exists()) {
                    setCommunityName(communitySnap.val().name);         // sets communityName to name from community stored in db
                } else {
                    setCommunityName("Community not found")
                }

                if (storySnap.exists()) {
                    const allStories = storySnap.val();
                    const filteredStories = Object.values(allStories).filter((story) =>
                    story.communities && story.communities.includes(id));                   // filter to only stories posted in said community, then store in stories var

                    setStories(filteredStories);                                            
                } 
            } catch (err) {
                console.error("Error loading data:", err);
                setCommunityName("Error loading community");
            }
        };
        fetchCommunityAndStory(); // function call
    }, [id]);


    return (
        <div className="comm-board-container">

            {/* Go Back to MyCommunities */}
            <div className="comm-button">
                <a id="comms" onClick={() => navigate('/my-communities')}>&larr; Back to My Communities</a>
            </div>

            {/* Community Name & edit community button */}
            <div className="comm-header">
                <span><h1>{communityName}</h1></span>
                <span className="edit-btn"><a onClick={() => navigate(`/community-settings/${id}`)}>Edit</a></span>
            </div>

            {/* Stories display */}
            <div className="stories-section">
                 <div className="stories-grid">
                    {stories.length > 0 ? (
                        stories.map((story, index) => (
                            <div key={index} className="story-card">
                                <div className="story-title">{story.title}</div>
                                <div className="story-meta">{story.year}<br />{story.culture}<br />{story.tags}</div>
                            </div>
                        ))
                    ) : (
                        <div className="comm-empty-stories">
                            <p>No stories shared here yet</p>
                            <p>Be the first to share your story!</p>
                        </div>
                    )
                    }
                </div> 
            </div>
        </div>
    );
}

export default CommunityBoard;

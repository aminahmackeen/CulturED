import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from "uuid";
import { ref, push, set } from 'firebase/database';
import { db } from '../firebase';

// This component creates the community and stores it in the database
// After creation, leads to the specific community board
const CreateCommunity = () => {
    const navigate = useNavigate();
    const [communityName, setCommunityName] = useState(""); 
    
    // This function handles the creation of a new community when button is clicked.
    const handleCreate = async (e) => {
        e.preventDefault();

        if (!communityName.trim()) {    // Check if name is empty or whitespace
            alert("Please enter a community name");
            return;
        }

        // const communityId = uuidv4();
        // Pushes to database
        try {
            const communityRef = ref(db, "communities");    // gets ref to "communities" from firebase db
            const newCommunityRef = push(communityRef);     // creates unique id for "communities" and returns ref of said id
            await set(newCommunityRef, {                    // stores community data to newly created community
                name: communityName,
                dateCreated: Date.now()
            });

            // Go to community board of newly created community
            navigate(`/community/${newCommunityRef.key}`, {state: { communityName }, });
        } catch (err) {
            console.error("Error creating community:", err);
        }
        
    };


    return (
        <div className="comm-create-container">
            {/* Go Back to MyCommunities */}
            <div className="comm-button">
                <button id="comms" onClick={() => navigate('/my-communities')}>
                &larr; Back to My Communities
                </button>
            </div>

            {/* Create Community div with name input and submit input */}
            <div className="community">
                <h2>Create A Community</h2>
                <form onSubmit={handleCreate}>
                    <label>Name your community:</label>
                    <input type="text" id="comm-name" name="comm-name" value={communityName} onChange={(e) => setCommunityName(e.target.value)} />
                    <input type="submit" value="Create" />
                </form>
            </div>
        </div>
    );
}

export default CreateCommunity;
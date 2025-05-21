import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, onValue, update, remove, get } from 'firebase/database';
import { db } from '../firebase';

// display community name
// if edit button is clicked, edit community name and save
// left side of screen: display members, and number of stories
// right side of screen: display invite link and delete community button below

const CommunitySettings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [members, setMembers] = useState([]);
    const [storiesCount, setStoriesCount] = useState([]);
    const [invite, setInvite] = useState("");

    
    useEffect(() => {
        // listen to changes to community name
        const commRef = ref(db, `communities/${id}`);
        onValue(commRef, async (snapshot) => {                // listen for changes
            const data = snapshot.val();                // get change
            if (data) {
                setEditedName(data.name || "Community Name Unsaved");    // if got changes, set community name to input
                setInvite(id);                              // set change to id
                if (data.users) {
                    const userIds = Object.values(data.users);

                    const usersPromises = userIds.map(async (uid) => {
                        const userSnap = await get(ref(db, `users/${uid}`))
                        //return userSnap.val();
                        const userData = userSnap.val();
                        if (!userData) {console.warn(`No user data found for uid: ${uid}`); return null;}
                        //console.log(userData.formalName, userData.userName);
                        return {...userData, id: uid};
                    })
                    const usersInfo = (await Promise.all(usersPromises)).filter(Boolean);
                    setMembers(usersInfo);  // if community has members, assign to members
                }
            }
        })

        // gets all the stories posted in community
        const storyRef = ref(db, "stories");
        onValue(storyRef, (snapshot) => {
            const allStories = snapshot.val();
            if (allStories) {
                setStoriesCount(Object.values(allStories).filter(
                    story => story.communities && story.communities.includes(id)
                ));
            }
        });
    }, [id]);

    // updates edited name to db
    const handleEditName = async () => {
        if (editedName.trim()) {
            await update(ref(db, `communities/${id}`), {name: editedName});
            setIsEditing(false);
            alert("Community name updated");
        } else {
            alert("Name cannot be empty!");
        }
    }

    // counts total number of stories per user in a community
    const getStoryCount = (userId) => {
        return storiesCount.filter((story) => story.owner === userId).length;
    };

    // const handleDeleteComm = async () => {
    //     const confirm = window.confirm("Are you sure you want to delete this community?");
    //     if(confirm) {
    //         await update(ref(db, `communities/${id}`), null);
    //         navigate('/my-communities');
    //     }
    // }

    // delete community and remove community from db
    const handleDeleteComm = async () => {
        const confirmDel = window.confirm("Are you sure you want to delete this community?");
        if (confirmDel) {
            try {
                await remove(ref(db, `communities/${id}`));
                navigate("/my-communities");
            } catch (err) {
                console.error("Failed to delete community:", err);
            }
        }
    }

    return (
        <div className="comm-settings-container">
            {/* Go Back to MyCommunities */}
            <div className="comm-button">
                <button id="comms" onClick={() => navigate('/my-communities')}>
                &larr; Back to My Communities
                </button>
            </div>

            {/* Community name and rename button */}
            <div className="comm-header">
                {!isEditing ? (
                    <div className="comm-edit-header">
                        <h1>{editedName}</h1>
                        <button onClick={() => setIsEditing(true)}>Rename</button>
                    </div>
                ) : (
                    <div>
                        <input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                        <button onClick={handleEditName}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                )}
            </div>

            {/* display member */}
            <div className="member-container">
                <div className="member-section">
                    <h2>Community Members:</h2>
                    <table id="member-grid">
                        <thead className="member-header">
                            <tr>
                                <th>Name</th>
                                <th>Number of Posts</th>
                                {/* <th>Remove</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                            // <div className="comm-list-zero">
                                <tr><td colSpan="3">No members in the community yet</td></tr>
                            // </div>
                            ) : (members.map((user, index) => (
                                //console.log(index, user.email);
                                <tr key={index}>
                                    <td>{user.formalName}</td>
                                    <td>{getStoryCount(user.id)} posts</td>
                                </tr>
                            )))
                            }
                            {/* <tr key={user.uid} className="member-card">
                                <td className="member-name">{user.name}</td>
                                <td className="member-posts">{userStories[user.uid] || 0}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>

                
                <div className="comm-edit">
                    {/* invite link */}
                    <div className="comm-invite">
                        <h3>Invite link</h3>
                        <p className="code-invite">{window.location.origin}/join/community/{invite}</p>
                        <p>Share this code to others!</p>
                    </div>
                    {/* delete button */}
                    <button className="comm-del-btn" onClick={handleDeleteComm}>Delete Community</button>
                </div>
            </div>
        
        </div>
    );
}

export default CommunitySettings;

//console.log("commId:", id);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const dbRef = ref(db);

    //         const communitySnap = await get(child(dbRef, `communities/${id}`));
    //         const usersSnap = await get(child(dbRef, "users"));
    //         const storySnap = await get(child(dbRef, "stories"));

    //         if (communitySnap.exists()) {
    //             const communityData = communitySnap.val();
    //             setCommunity(communityData);
    //             setEditedName(communityData.name);

    //             // Map users (members) to community
    //             if (usersSnap.exists()) {
    //                 const allUsers = usersSnap.val();
    //                 const communityMembers = communityData.users || [];
    //                 const memberInfo = communityMembers.map((uid) => ({uid, ...allUsers[uid], }));
    //                 setMembers(memberInfo);
    //             }

    //             // Count stoires of each member
    //             if (storySnap.exists()) {
    //                 const allStories = Object.values(storySnap.val());
    //                 const storyCounts = {};

    //                 allStories.forEach((story) => {
    //                     if (story.communities?.includes(id)) {
    //                         storyCounts[story.owner] = (storyCounts[story.owner] || 0) + 1;
    //                     }
    //                 });
    //                 setStoriesCount[storyCounts];
    //             }
    //         }
    //     };
    //     fetchData();
    // }, [id]);
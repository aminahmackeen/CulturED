import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, update, onValue} from 'firebase/database';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";

const MyCommunities = ({ userId }) => {
    //const { id } = useParams();
    const navigate = useNavigate();
    const [commList, setCommList] = useState([]);

    useEffect(() => {
        const fetchComms = async () => {
            const userCommSnap = await get(ref(db, `users/${userId}/communities`));
            const userComms = userCommSnap.val() || {};
            const commIds = Object.keys(userComms);

            const commListData = await Promise.all(
                commIds.map(async (commId) => {
                    const commSnap = await get(ref(db, `communities/${commId}`));
                    const commData = commSnap.val();
                    if (commData) {
                        return {
                            id: commId,
                            name: commData.name,
                            memberCount: commData.users?.length || 0,
                            dateJoined: userComms[commId]
                        }
                    }
                    return null;
                })
            )
            // onValue(userRef, (snapshot) => {
            //     const userComms = snapshot.val() || {};
            //     const commIds = Object.keys(userComms);

            //     const allComms = [];

            //     commIds.forEach((commId) => {
            //         const commRef = ref(db, `communities/${commId}`);
            //         onValue(commRef, (commSnap) => {
            //             const commData = commSnap.val();
            //             if (commData) {
            //                 allComms.push({
            //                     id: commId,
            //                     name: commData.name,
            //                     memberCount: commData.users?.length || 0,
            //                     dateJoined: userComms[commId],
            //                 });
            //                 setCommList([...allComms]);
            //             }
            //         });
            //     }); //commId
            // });
            setCommList(commListData.filter(Boolean)); //remove null
        }
        fetchComms();
    }, [userId]);

    const handleLeaveComm = (commId) => {
        const userCommRef = ref(db, `users/${userId}/communities/${commId}`);
        const commUserRef = ref(db, `communities/${commId}/users`);
        update(userCommRef, null);
        onValue(commUserRef, (snapshot) => {
            const users = snapshot.val() || [];
            const updatedUsers = users.filter((uid) => uid !== userId);
            update(ref(db, `communities/${commId}`), {users:updatedUsers});
        });
    };

    return (
        <div className="my-communities-container">
            <h1 className="my-comm-h1">My Communities</h1>
            <div className="communities-container">
                <table id="communities-grid">
                    <thead className="communities-header">
                        <tr>
                            <th>Community Name</th>
                            <th>Number of Members</th>
                            <th>Join Date</th>
                            <th>Leave button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commList.length === 0 ? (
                            // <div className="comm-list-zero">
                                <tr><td>You are not part of any community yet</td></tr>
                            // </div>
                        ) : (
                            commList.map((community) =>
                            <tr key={community.id}>
                                <td className="tr-comm-name">{community.name}</td>
                                <td>{community.memberCount} members</td>
                                <td>{new Date(community.dateJoined).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleLeaveComm(community.id)}>Leave</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <button onClick={() => navigate("/create-community")}  className="my-comm-btns">Create A Community</button>
            </div>

        </div>
    );
}

export default MyCommunities;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, ref, update, onValue} from 'firebase/database';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";

const MyCommunities = ({ userId }) => {
    //const { id } = useParams();
    const navigate = useNavigate();
    const [commList, setCommList] = useState([]);

    if (!userId) {
        return (
            <div>
            <h2>Log in to view your communities.</h2>
            <button onClick={() => navigate('/')}>Go to Login</button>
            </div>
        );
    }

    useEffect(() => {
      // uncomment after fully coded
      //if (!userId) return;

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
                            dateJoined: userComms[commId].dateJoined
                        }
                    }
                    return null;
                })
            )
            // Object.values(userComms).map((comm) => ({
            //     id: comm.id,
            //     name: comm.name,
            //     dateJoined: comm.dateJoined,
            // }))

            setCommList(commListData.filter(Boolean)); //remove null
        }
        fetchComms();
    }, [userId]);

    const handleLeaveComm = async (commId) => {
        const userCommRef = ref(db, `users/${userId}/communities/${commId}`);
        const commUserRef = ref(db, `communities/${commId}/users`);
        
        await update(userCommRef, null);

        const snapshot = await get(commUserRef);
        const users = snapshot.val() || [];
        const updatedUsers = users.filter((uid) => uid !== userId);
        update(ref(db, `communities/${commId}`), {users:updatedUsers});

        setCommList(prev => prev.filter(c => c.id !== commId));
    };

    // uncomment after fully coded

    return (
        <div className="my-communities-container">
            <h1 className="my-comm-h1">My Communities</h1>
            <div className="communities-container">
                <table id="communities-grid">
                    <thead className="communities-header">
                        <tr>
                            <th style={{ width: '60%' }}>Community Name</th>
                            <th style={{ width: '15%' }}>Number of Members</th>
                            <th style={{ width: '15%' }}>Join Date</th>
                            <th style={{ width: '10%' }}></th>
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
                                <td className="td-comm-name"><button onClick={() => navigate(`/community/${community.id}`)}>{community.name}</button></td>
                                <td className="td-comm-member">{community.memberCount} members</td>
                                <td className="td-comm-date">{new Date(community.dateJoined).toLocaleDateString()}</td>
                                <td className="td-comm-leave">
                                    <button onClick={() => handleLeaveComm(community.id)}>Leave</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="my-comm-btns">
                <button onClick={() => navigate("/create-community")}>Create A Community</button>
            </div>

        </div>
    );
}

export default MyCommunities;
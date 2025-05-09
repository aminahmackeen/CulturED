import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, update, set as firebaseSet, 
push as firebasePush, onValue } from 'firebase/database';
import { db } from '../firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth'; //*
import { getAuth, signOut } from 'firebase/auth'; //*


// what does useEffect do
// making the initial object in state

const MyCommunities = () => {
  
  const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[0]); //*

  const addCommunity = () => {
    const newCommunityObj = {
      "firbaseKey": "",
      "owner": userObj.userEmail,
      "name": "",
      "users": []
    }
  }

  // effect to run when the component first loads // for sign in
  useEffect(() => {
    // log in a default user
    // changeUser(DEFAULT_USERS[1])

    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUserObj) => {
      console.log("auth state changed");
      console.log(firebaseUserObj);

      if (firebaseUserObj != null) { // user signed in
        firebaseUserObj.userId = firebaseUserObj.uid;
        firebaseUserObj.userName = firebaseUserObj.displayName;
        firebaseUserObj.userImg = firebaseUserObj.photoURL || img/null.png;
        setCurrentUser(firebaseUserObj);
      }
      else { // is null, user signed out
        setCurrentUser(DEFAULT_USERS[0]);
      }
    })

  }, [])

  // for sign out
  const handleSignOut = (event) => {
    console.log("signing out");
    const auth = getAuth();
    signOut(auth);
  }

  
  
  // reading to database
  useEffect(() => {
    // subscribe to the database
    const db = getDatabase();
    const communitiesRef = ref(db, "communities") // address
    
    // takes in a callback function. Similar to: addEventListener('firebase value change', function)
    // this downloads a snapshot (a firebase object) of the data anytime it changes
    onValue(communitiesRef, (snapshot) => {
      // console.log("database changed");
      const dataObj = snapshot.val();
      console.log(dataObj); // is an {}

      const keyArray = Object.keys(dataObj); // keyArray is ['','','']
      const dataArray = keyArray.map((keyString) => {
        const transformed = dataObj[keyString]; // get value at that key
        transformed.firebaseKey = keyString;
        return transformed; // put into new array
      })
      setCommunityStateArray(dataArray); // needs to be an [{},{},{}]

    });
  
  }, [])

// const updateCommunityArray = [...msgStateArray, newMessageObj];
const db = getDatabase();
// const communityRef = ref(db, "community");
// firebaseSet(communityRef, newCommunityObj); // setting indv obj

// writing to database
const communitiesRef = ref(db,"communities");
firebasePush(communitiesRef, newCommunityObj) // push into an object with a key like an array

// MyCommunities --Mai
    const navigate = useNavigate();
    const [commList, setCommList] = useState([]);

    useEffect(() => {
        const fetchComms = async () => {
            const userCommSnap = await get(ref(db, `users/${userId}/communities`));     //get communities user is in
            const userComms = userCommSnap.val() || {};
            const commIds = Object.keys(userComms);

            const commListData = await Promise.all(
                commIds.map(async (commId) => {
                    const commSnap = await get(ref(db, `communities/${commId}`));        //get ref to those communities
                    const commData = commSnap.val();
                    if (commData) {                                                      // get data of those communities
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
            setCommList(commListData.filter(Boolean)); //remove null & get list of user's communities
        }
        fetchComms();   // function call
    }, [userId]);

    // handle when user leaves a community
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
                                <tr><td>You are not part of any community yet</td></tr>
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
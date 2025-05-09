import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set as firebaseSet, 
push as firebasePush, onValue } from 'firebase/database';

import { getAuth, onAuthStateChanged } from 'firebase/auth'; //*
import { getAuth, signOut } from 'firebase/auth'; //*


// what does useEffect do
// making the initial object in state



function MyCommunities() {
  
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

}

export default MyCommunities;
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set as firebaseSet, 
push as firebasePush, onValue } from 'firebase/database';

// what does useEffect do
// making the initial object in state



function MyCommunities() {
  
  const addCommunity = () => {
    const newCommunityObj = {
      "firbaseKey": "",
      "owner": userObj.userEmail,
      "name": "",
      "users": []
    }
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase';
import '../index.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function AccountSettings() {
  const navigate = useNavigate();
  
  const [userFormData, setUserFormData] = useState({
    email: "",
    userName: "",
    formalName: "",
    phonetic: "",
    audio: "",
    bio: ""
  });
  const [currentUserRef, setCurrentUserRef] = useState(null);
  console.log("userFormData: ", userFormData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const refPath = ref(db, 'users/' + user.uid);
        setCurrentUserRef(refPath);

        get(refPath).then((snapshot) => {
          if (snapshot.exists()) {
            const userSnapshot = snapshot.val();
            console.log("userSnapshot: ", userSnapshot);
            setUserFormData(userSnapshot);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        console.log("No user is signed in");
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // handles text input for phonetic (+ other inputs eventually)
  function handleChange(event) {
    const { name, value } = event.target;

    const updatedUserFormData = { ...userFormData, [name]: value }
    setUserFormData(updatedUserFormData);
  };

  // on submit, new userFormData is sent to database
  function handleSubmit(event) {
    event.preventDefault();
    set(currentUserRef, userFormData);
    alert("User Info saved");
  };

  // // passes userFormData to userDataArray in App.js
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   onSubmit(userFormData);
  //   alert("User Info saved");
  //   // add a pop-up saying User Data Saved
  // };

  // handle Sign Out
  const handleSignOut = (event) => {
    console.log("signing out");
    signOut(auth);
    navigate('/');
  }

  return (

    <div className="share-story-container">
      <h1>Account Settings</h1>
      <h2>Profile</h2>
      <div>
        <form id="user-form" className="" onSubmit={handleSubmit}>
          {/* <input type="text" placeholder="name" value={userFormData.name} /> */}
          <Phonetic phonetic={userFormData.phonetic} handleChange={handleChange}/>
          <Bio bio={userFormData.bio} handleChange={handleChange}/>
          {/* <input type="text" placeholder="phofuh-neh-tik spel-ing" value={userFormData.phonetic} onChange={(e) => setTitle(e.target.value)} /> */}
          <button id="" type="submit" className="btn">Save User Info</button>
        </form>
      </div>

      <button className="btn" onClick={handleSignOut}>LogOut</button>
    </div>
  )
}

// Component for Phonetic Spelling input field
function Phonetic({ phonetic, handleChange }) {

  return (
      <div>
          <label htmlFor="phonetic-spelling" className="">Phonetic Spelling</label>
          <input 
              id="phonetic-spelling"
              name="phonetic"
              value={phonetic}
              onChange={handleChange}
              className=""
              type="string"
              placeholder="fuh-neh-tik spel-ing"
              required
          />
      </div>
  );
}

// Component for bio input field
function Bio({ bio, handleChange }) {

  return (
      <div>
          <label htmlFor="user-bio" className="">Bio</label>
          <textarea 
              id="user-bio"
              name="bio"
              value={bio}
              onChange={handleChange}
              className=""
              type="string"
              placeholder="Type bio here"
              required
          />
      </div>
  );
}
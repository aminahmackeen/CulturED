import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import '../index.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function AccountSettings({ onSubmit }) {
  
  const [userFormData, setUserFormData] = useState({
    email: "",
    userName: "",
    name: "",
    phonetic: "",
    audio: "",
    bio: ""
  });
  console.log(userFormData);

  // handles text input for phonetic (+ other inputs eventually)
  function handleChange(event) {
    const { name, value } = event.target;

    const updatedUserFormData = { ...userFormData, [name]: value }
    setUserFormData(updatedUserFormData);
  };

  // passes userFormData to userDataArray in App.js
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(userFormData);
    alert("User Info saved");
    // add a pop-up saying User Data Saved
  };

  // handle Sign Out
  const handleSignOut = (event) => {
    console.log("signing out");
    signOut(auth);
  }

  return (

    <div className="share-story-container">
      <h1>Account Settings</h1>
      <h2>Profile</h2>
      <div>
        <form id="user-form" className="" onSubmit={handleSubmit}>
          {/* <input type="text" placeholder="name" value={userFormData.name} /> */}
          <Phonetic phonetic={userFormData.phonetic} handleChange={handleChange}/>
          {/* <input type="text" placeholder="phofuh-neh-tik spel-ing" value={userFormData.phonetic} onChange={(e) => setTitle(e.target.value)} /> */}
          {/* <textarea placeholder="Type bio here" value={userFormData.bio} /> */}
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
import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import NavBar from './components/NavBar.jsx';
import { Login } from './components/LogIn';
import ExplorePage from './components/ExplorePage.jsx';
import ShareStory from './components/ShareStory.jsx';
import StoryPage from './components/StoryPage.jsx';
import CreateCommunity from './components/CreateCommunity.jsx';
import CommunitySettings from './components/CommunitySettings.jsx';
import CommunityBoard from './components/CommunityBoard.jsx';
import MyCommunities from './components/MyCommunities.jsx';
import JoinCommunity from './components/JoinCommunity.jsx';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import AccountSettings from './components/AccountSettings.jsx';
import { db } from './firebase';
import { ref, set, get, onValue } from 'firebase/database';

// const provider = new GoogleAuthProvider();

function App() {
  
  //const [currentUser, setCurrentUser] = useState("loggedout@email.com");
  const [currentUser, setCurrentUser] = useState(null);
  console.log("App's currentUser: ", currentUser)
  const [loading, setLoading] = useState(true);
  const [userDataArray, setUserDataArray] = useState([{}]);
  console.log(userDataArray); // Debug

  useEffect(() => {
    // const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("auth state changed");

      if (firebaseUser != null) { // user signed in
        firebaseUser.userName = firebaseUser.email.split('@')[0];
        firebaseUser.name = firebaseUser.displayName;
        //setCurrentUser(firebaseUser.email);
        setCurrentUser(firebaseUser);
      }
      else { // is null, user signed out
        //setCurrentUser("loggedout@email.com");
        setCurrentUser(null);
      }
      setLoading(false);
    })
    return () => unsubscribe();
  }, [])

  if (loading) return <div>Loading CulturED Website...</div>

  function handleUserFormSubmit(userFormData) {
    console.log("userFormData: ", userFormData);
    const updatedUserDataArray = [...userDataArray, userFormData];
    setUserDataArray(updatedUserDataArray);
  };

  return (
      <div>
        <NavBar />
        <main>
          <Routes>
            <Route path="/explorepage" element={<ExplorePage />} />
            <Route path="/" element={<Login  />} />
            <Route path="/sharestory" element={<ShareStory userId={currentUser?.uid}/>} />
            <Route path="/story/:id" element={<StoryPage />} />
            <Route path="/accountsettings" element={<AccountSettings onSubmit={handleUserFormSubmit}/>} />
            <Route path="/create-community" element={<CreateCommunity user={currentUser?.uid}/>} />
            <Route path="/community/:id" element={<CommunityBoard user={currentUser}/>} />
            <Route path="/community-settings/:id" element={<CommunitySettings user={currentUser}/>} />
            <Route path="/my-communities" element={<MyCommunities userId={currentUser?.uid}/>} />
            <Route path="/join/community/:id" element={<JoinCommunity user={currentUser}/>} />
          </Routes>             
        </main>
      </div>
  );
};

export default App;

// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { Routes, Route } from 'react-router-dom';
// // import './App.css'
// import NavBar from './components/NavBar.jsx';
// import { Login } from './components/LogIn';
// import ExplorePage from './components/ExplorePage.jsx';
// import ShareStory from './components/ShareStory.jsx';
// import StoryPage from './components/StoryPage.jsx';
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from './firebase';
// import AccountSettings from './components/AccountSettings.jsx';
// import { db } from './firebase';
// import { ref, set, get, onValue } from 'firebase/database';

// // const provider = new GoogleAuthProvider();

// function App() {
  
//   console.log("Current Firebase User: ", auth.currentUser);
//   const currentUserIdRef = ref(db, "currentUserId");

//   useEffect(() => {

//     const setup = async () => {
//       const usersRef = ref(db, 'users');
//       const snapshot = await get(usersRef); // Wait for the snapshot

//       const usersObj = snapshot.exists() ? snapshot.val() : {};
//       const keyArray = Object.keys(usersObj);
//       console.log(keyArray);

//       // when currentUserId changes
//       onValue(currentUserIdRef, (snapshot) => {
//         const userIdData = snapshot.val();
//         console.log("Current User ID: ", userIdData);

//         // if userId is not already in the users object, then it will add default info
//         if (!keyArray.includes(userIdData) && userIdData != "UserNotSignedIn") {
//           const currUserRef = ref(db, "users/" + userIdData);
//           const newUserObj = {
//             email: auth.currentUser.email,
//             userName: auth.currentUser.email.split('@')[0],
//             formalName: auth.currentUser.displayName,
//             phonetic: "",
//             audio: "",
//             bio: ""         
//           };
//           set(currUserRef, newUserObj);
//         }
//       });
//     };

//     setup();
//   }, []);

//   // When user logs in and out, currentUserId is changed in database
//   useEffect(() => {

//     onAuthStateChanged(auth, (firebaseUser) => {
//       console.log("auth state changed");

//       if (firebaseUser != null) { // user signed in
//         set(currentUserIdRef, firebaseUser.uid)
//       }
//       else { // is null, user signed out
//         set(currentUserIdRef, "UserNotSignedIn");
//       }

//     })

//   }, [])

//   return (
//     <div>
//       <NavBar />
//       <main>
//         <Routes>
//           <Route path="/explorepage" element={<ExplorePage />} />
//           <Route path="/" element={<Login  />} />
//           <Route path="/sharestory" element={<ShareStory />} />
//           <Route path="/story/:id" element={<StoryPage />} />
//           <Route path="/accountsettings" element={<AccountSettings />} />


//         </Routes>           
//       </main>
   
//     </div>
//   );
// };





  
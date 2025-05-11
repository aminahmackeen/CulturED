import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
// import './App.css'
import NavBar from './components/NavBar.jsx';
import { Login } from './components/LogIn';
import ExplorePage from './components/ExplorePage.jsx';
import ShareStory from './components/ShareStory.jsx';
import StoryPage from './components/StoryPage.jsx';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import AccountSettings from './components/AccountSettings.jsx';
import { db } from './firebase';
import { ref, set, get, onValue } from 'firebase/database';

// const provider = new GoogleAuthProvider();

function App() {
  
  console.log("Current Firebase User: ", auth.currentUser);
  const currentUserIdRef = ref(db, "currentUserId");

  useEffect(() => {

    const setup = async () => {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef); // Wait for the snapshot

      const usersObj = snapshot.exists() ? snapshot.val() : {};
      const keyArray = Object.keys(usersObj);
      console.log(keyArray);

      // when currentUserId changes
      onValue(currentUserIdRef, (snapshot) => {
        const userIdData = snapshot.val();
        console.log("Current User ID: ", userIdData);

        // if userId is not already in the users object, then it will add default info
        if (!keyArray.includes(userIdData) && userIdData != "UserNotSignedIn") {
          const currUserRef = ref(db, "users/" + userIdData);
          const newUserObj = {
            email: auth.currentUser.email,
            userName: auth.currentUser.email.split('@')[0],
            formalName: auth.currentUser.displayName,
            phonetic: "",
            audio: "",
            bio: ""         
          };
          set(currUserRef, newUserObj);
        }
      });
    };

    setup();
  }, []);

  // When user logs in and out, currentUserId is changed in database
  useEffect(() => {

    onAuthStateChanged(auth, (firebaseUser) => {
      console.log("auth state changed");

      if (firebaseUser != null) { // user signed in
        set(currentUserIdRef, firebaseUser.uid)
      }
      else { // is null, user signed out
        set(currentUserIdRef, "UserNotSignedIn");
      }

    })

  }, [])

  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/explorepage" element={<ExplorePage />} />
          <Route path="/" element={<Login  />} />
          <Route path="/sharestory" element={<ShareStory />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/accountsettings" element={<AccountSettings />} />


        </Routes>           
      </main>
   
    </div>
  );
};

export default App;







  // const user = auth.currentUser;
  // console.log("current User: ", user);
  // // const currentUserRef = ref(db, "currentUser");
  // if(!user) {
  //   const currentUserRef = "No user is signed in.";
  // } else {
  //   const currentUserRef = ref(db, 'users/' + user.uid);
  // }
  

  // // const [currentUser, setCurrentUser] = useState("loggedout@email.com");
  // // console.log("App's currentUser: ", currentUser)

  // // const currentUserRef = ref(db, "currentUser");
  // // console.log("App's currentUser: ", currentUserRef)
  
  
  // useEffect(() => {
  //   // const auth = getAuth();

  //   const currentUserObj = {
  //     uid: "",
  //     email: "",
  //     userName: "",
  //     formalName: "",
  //     phonetic: "",
  //     audio: "",
  //     bio: ""
  //   }

  //   onAuthStateChanged(auth, (firebaseUser) => {
  //     console.log("auth state changed");
  //     // console.log(currentUserObj);
  //     // set(currentUserRef, currentUserObj);
      
  //     // console.log("auth state changed");
  //     // console.log(firebaseUser);

  //     if (firebaseUser != null) { // user signed in
  //       // currentUserObj.uid = firebaseUser.uid;
  //       currentUserObj.email = firebaseUser.email;
  //       // THIS DOESNT WORK, will not persist or change firebase
  //       if (!user.uid.userName) {
  //         console.log("userName does not exist")
  //         firebaseUser.userName = firebaseUser.email.split('@')[0];
  //       }
  //       if (!user.uid.formalName) {
  //         firebaseUser.formalName = firebaseUser.displayName;
  //       }
  //       if (!user.uid.phonetic) {
  //         firebaseUser.phonetic = null;
  //       }
  //       if (!user.uid.audio) {
  //         firebaseUser.audio = null;
  //       }
  //       if (!user.uid.bio) {
  //         firebaseUser.bio = null;
  //       }
  //       currentUserObj.userName = firebaseUser.userName;
  //       currentUserObj.formalName = firebaseUser.formalName;
  //       currentUserObj.phonetic = firebaseUser.phonetic;
  //       currentUserObj.audio = firebaseUser.audio;
  //       currentUserObj.bio = firebaseUser.bio;
  //       // setCurrentUser(firebaseUser.email);
  //       // set(currentUserRef, firebaseUser.email);
  //       console.log(currentUserObj);
  //       set(currentUserRef, currentUserObj)
  //       console.log("currentuser:", auth.currentUser)
  //     }
  //     // else { // is null, user signed out
  //     //   // setCurrentUser("loggedout@email.com");
  //     //   set(currentUserRef, "No user is signed in.");
  //     // }

  //   })

  // }, [])
  
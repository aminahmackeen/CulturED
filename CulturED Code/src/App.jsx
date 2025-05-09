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

// const provider = new GoogleAuthProvider();

function App() {
  
  const [currentUser, setCurrentUser] = useState("loggedout@email.com");
  console.log("App's currentUser: ", currentUser)

  useEffect(() => {
    // const auth = getAuth();

    onAuthStateChanged(auth, (firebaseUser) => {
      console.log("auth state changed");
      console.log(firebaseUser);

      if (firebaseUser != null) { // user signed in
        firebaseUser.userName = firebaseUser.email.split('@')[0];
        firebaseUser.name = firebaseUser.displayName;
        setCurrentUser(firebaseUser.email);
      }
      else { // is null, user signed out
        setCurrentUser("loggedout@email.com");
      }

    })

  }, [])

  const [userDataArray, setUserDataArray] = useState([{}]);
  console.log(userDataArray); // Debug

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
          <Route path="/sharestory" element={<ShareStory />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/accountsettings" element={<AccountSettings onSubmit={handleUserFormSubmit}/>} />


        </Routes>           
      </main>
   
    </div>
  );
};

export default App;
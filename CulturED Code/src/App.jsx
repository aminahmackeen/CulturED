import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
// import './App.css'
import NavBar from './components/NavBar.jsx';
import { Login } from './components/LogIn';
import ExplorePage from './components/ExplorePage.jsx';
import ShareStory from './components/ShareStory.jsx';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

function App() {
  
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/explorepage" element={<ExplorePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/sharestory" element={<ShareStory />} />

        </Routes>           
      </main>
   
    </div>
  );
};

export default App;
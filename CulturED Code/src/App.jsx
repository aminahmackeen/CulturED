import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import NavBar from './components/NavBar.jsx';
import { Login } from './components/LogIn';
import ExplorePage from './components/ExplorePage.jsx';
import ShareStory from './components/ShareStory.jsx';
import StoryPage from './components/StoryPage.jsx';
import { GoogleAuthProvider } from "firebase/auth";
import CreateCommunity from './components/CreateCommunity.jsx';
import CommunitySettings from './components/CommunitySettings.jsx';
import CommunityBoard from './components/CommunityBoard.jsx';
import MyCommunities from './components/MyCommunities.jsx';
import JoinCommunity from './components/JoinCommunity.jsx';

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
            <Route path="/story/:id" element={<StoryPage />} />
            <Route path="/create-community" element={<CreateCommunity />} />
            <Route path="/community/:id" element={<CommunityBoard />} />
            <Route path="/community-settings/:id" element={<CommunitySettings />} />
            <Route path="/my-communities" element={<MyCommunities />} />
            <Route path="/join/community/:id" element={<JoinCommunity />} />
          </Routes>             
        </main>
      </div>
  );
};

export default App;
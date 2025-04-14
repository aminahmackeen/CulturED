import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
// import './App.css'
import NavBar from './components/NavBar.jsx';
import ExplorePage from './components/ExplorePage.jsx';

function App() {
  
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/explorepage" element={<ExplorePage />} />
          {/* <Route path="/" element={<HomePage />} /> */}
        </Routes>           
      </main>
   
    </div>
  );
};

export default App;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
// import './App.css'
import ExplorePage from './components/ExplorePage.jsx';

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
  );
};

export default App;
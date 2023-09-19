import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Rockets from './components/Rockets';
import Profile from './components/MyProfile';
import Navigation from './components/Navigation'; 

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/Missions" element={<Missions />} />
        <Route path="/MyProfile" element={<Profile />} />
        <Route path="/Rockets" element={<Rockets />} />

      </Routes>
    </div>
  );
}

export default App;

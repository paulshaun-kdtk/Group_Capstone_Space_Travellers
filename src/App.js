import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Rockets from './components/Rockets';
import Profile from './components/MyProfile';
import Navigation from './components/Navigation'; 

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/Missions" element={<Missions />} />
        <Route path="/MyProfile" element={<Profile />} />
        <Route path="/Rockets" element={<Rockets />} />

      </Routes>
    </Router>
  );
}

export default App;

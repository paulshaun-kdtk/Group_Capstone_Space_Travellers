import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Rockets from './components/Rockets';
import Profile from './components/MyProfile';
import Missions from './components/Navigation'; // Import the Navigation component

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/Missions" element={<Missions />} />
        <Route path="/MyProfile" element={<Profile />} />
        <Route path="/Rockets" element={<Rockets />} />

      </Routes>
    </Router>
  );
}

export default App;

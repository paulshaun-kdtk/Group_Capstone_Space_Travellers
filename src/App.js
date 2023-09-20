import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Missions from './components/Missions';
import Rockets from './components/Rockets';
import Profile from './components/MyProfile';
import store from './Redux/store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Rockets />} />
            <Route path="/Missions" element={<Missions />} />
            <Route path="/MyProfile" element={<Profile />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import MyProfile from './components/MyProfile';
import Navigation from './components/Navigation'; // Import the Navigation component

function App() {
  return (
    <Router>
      <Navigation /> {/* Render the Navigation component */}
      <Switch>
        <Route path="/rockets" component={Rockets} />
        <Route path="/missions" component={Missions} />
        <Route path="/myprofile" component={MyProfile} />
      </Switch>
    </Router>
  );
}

export default App;

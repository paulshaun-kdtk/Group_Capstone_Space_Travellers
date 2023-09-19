import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/rockets" activeClassName="active-link">
            Rockets
          </NavLink>
        </li>
        <li>
          <NavLink to="/missions" activeClassName="active-link">
            Missions
          </NavLink>
        </li>
        <li>
          <NavLink to="/myprofile" activeClassName="active-link">
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

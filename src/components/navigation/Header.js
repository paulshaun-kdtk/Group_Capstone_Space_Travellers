import { NavLink } from 'react-router-dom';
import LogoImage from '../LogoImage';
import './Header.css';

const Header = () => {
  const activeLink = {
    textDecoration: 'underline',
  };
  return (
    <div className="navContainer">
      <nav className="navItems">
        <LogoImage />
        <h1>Space Traveler&apos;s Hub</h1>
        <ul className="navList">
          <li className="link">
            <NavLink to="/" style={({ isActive }) => (isActive ? activeLink : undefined)}>Rockets</NavLink>
          </li>
          <li className="link">
            <NavLink to="/Missions" style={({ isActive }) => (isActive ? activeLink : undefined)}>Missions</NavLink>
          </li>
          <li className="link">
            <NavLink to="/MyProfile" style={({ isActive }) => (isActive ? activeLink : undefined)}>MyProfile</NavLink>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default Header;

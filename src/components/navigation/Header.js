import { NavLink } from 'react-router-dom';
import LogoImage from '../LogoImage';
import './Header.css';

const Header = () => {
  const activeLink = {
    textDecoration: 'underline',
  };
  return (
    <nav className="Nav-container">
      <div className="logo-icon">
        <LogoImage />
        <p>Space Travelers&apos; Hub</p>
      </div>
      <ul className="navigation-links">
        <li className="link">
          <NavLink to="/" style={({ isActive }) => (isActive ? activeLink : undefined)}>Rockets</NavLink>
        </li>
        <li className="link">
          <NavLink to="/Missions" style={({ isActive }) => (isActive ? activeLink : undefined)}>Missions</NavLink>
        </li>
        <span>|</span>
        <li className="link">
          <NavLink to="/MyProfile" style={({ isActive }) => (isActive ? activeLink : undefined)}>MyProfile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

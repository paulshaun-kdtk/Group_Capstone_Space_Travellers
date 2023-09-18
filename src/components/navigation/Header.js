import React from 'react'
import logo from './logo.svg'
import './Header.css'

function Header() {
  return (
    <div className='navContainer'>
        <nav className='navItems'>
        <img className='Logo' src={logo} alt="Space Travellers"/>
            <ul className="navList">
                <li>Rockets</li>
                <li>Missions</li>
                <li>Profile</li>
            </ul>
        </nav>
    </div>
  )
}

export default Header
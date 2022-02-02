import React from 'react';
import { useRef } from 'react';
import './../styles/index.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const btn = useRef();
  return (
    <nav className='nav'>
      <div className='navbar'>
        <div className='logo'>
          <Link className='logo nav-link' to='/'>
            Wiki Food
          </Link>
        </div>
        <div className='nav-links'>
          <Link className='nav-link' to='/categories'>
            Categories
          </Link>
          <Link ref={btn} className='random-menu btn' to={`random-menu/`}>
            Random Menu
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

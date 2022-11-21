import './Navbar.css';
import React from 'react';
import logo from '../../images/logo.png';

function Navbar() {
  return (
    <div className='Navbar'>
      <div className='Logo'>
        <img src={logo}/>
        <h1>Seat Yourself!</h1>
      </div>
      <div className='Login'>
        <p style={{textAlign: 'center'}}>Already have an account?<br/><a href="https://github.com/PaulKuruvila" rel='noopener noreferrer' target='_blank'>Click here.</a></p>
        <button/>
      </div>
    </div>
  );
}

export default Navbar;
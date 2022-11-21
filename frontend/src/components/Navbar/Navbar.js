import './Navbar.css';
import React from 'react';
import logo from '../../images/logo.png';

function Navbar() {
  return (
    <div className='Navbar'>
      <div style={{display: 'flex', alignItems: 'center', cursor: 'help'}}>
        <img className='Logo' src={logo}/>
        <h1 className='Title'>Seat Yourself!</h1>
      </div>
      <div className='Login'>
        <p>Already have an account?</p>
        <button />
      </div>
    </div>
  );
}

export default Navbar;
import './Navbar.css';
import React, { useState } from 'react';
import logo from '../../images/logo.png';

function Navbar() {
  /*const [buttonText, setButtonText] = useState('Login');  This code is just sample code that was used for testing purposes

  const changeButtonText = () => {
    if(buttonText === 'Login')
      setButtonText('Create an account');
    else
      setButtonText('Login');
  };*/

  return (
    <div className='Navbar'>
      <div style={{display: 'flex', alignItems: 'center', cursor: 'help'}}>
        <img className='Logo' src={logo}/>
        <h1 className='Title'>Seat Yourself!</h1>
      </div>
      <div className='Login'>
        <p style={{textAlign: 'center'}}>Already have an account?<br/><a href="https://github.com/PaulKuruvila" rel='noopener noreferrer' target='_blank'>Click here.</a></p>
        <button/>
      </div>
    </div>
  );
}

export default Navbar;
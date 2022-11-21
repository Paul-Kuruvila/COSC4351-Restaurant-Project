import './Navbar.css';
import React from 'react';
import logo from '../../images/logo.png';

const Navbar = () => {
  const redirectHandler = (ref) => {
    window.location.href=`${ref}`;
  }

  return (
    <div className='Navbar'>
      <div className='Logo' onClick={() => redirectHandler('/')}>
        <img src={logo}/>
        <h1>Seat Yourself!</h1>
      </div>
      <div className='Login'>
        <p>Already have an account?<br/><a href="/login" rel='noopener noreferrer'>Click here.</a></p>
        <button onClick={() => redirectHandler('/signup')}/>
      </div>
    </div>
  );
}

export default Navbar;
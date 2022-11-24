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
        <img src={logo} alt={"Logo"}/>
        <h1>Seat Yourself!</h1>
      </div>
      <div className='Login-Options'>
        <p>Need to create an account?<br/><a href='/signup' rel='noopener noreferrer'>Sign up here.</a></p>
        <button onClick={() => redirectHandler('/login')}/>
      </div>
    </div>
  );
}

export default Navbar;
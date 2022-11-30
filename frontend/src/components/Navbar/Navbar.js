import './Navbar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [LoginStatus, setLoginStatus] = useState(false);

  const logoutHandler = () => {

  }

  return (
    <div className='Navbar'>
      <div className='Logo' onClick={() => navigate('/')}>
        <img src={logo} alt={"Logo"}/>
        <h1>Seat Yourself!</h1>
      </div>
      <div className='Login-Options'>
        <p className={LoginStatus ? 'hide' : ''}>Need to create an account?<br/><a href='/register' rel='noopener noreferrer'>Sign up here.</a></p>
        <button className={LoginStatus ? 'hide' : ''} onClick={() => navigate('/login')}>Login</button>
        <p onClick={() => navigate('/profile')} className={LoginStatus ? 'profile-button' : 'hide'}>View Profile</p>
        <button className={LoginStatus ? '' : 'hide'} onClick={() => logoutHandler()}>Sign out</button>
      </div>
    </div>
  );
}

export default Navbar;
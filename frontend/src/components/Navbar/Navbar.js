import './Navbar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='Navbar'>
      <div className='Logo' onClick={() => navigate('/')}>
        <img src={logo} alt={"Logo"}/>
        <h1>Seat Yourself!</h1>
      </div>
      <div className='Login-Options'>
        <p>Need to create an account?<br/><a href='/register' rel='noopener noreferrer'>Sign up here.</a></p>
        <button onClick={() => navigate('/login')}/>
      </div>
    </div>
  );
}

export default Navbar;
import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [LoginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
			const response = await fetch('/loginstatus');
			const jsonData = await response.json();
			console.log(jsonData);
			console.log(jsonData[1]);
			setLoginStatus(jsonData[1]);
		}

		checkLoginStatus()
			.catch(console.error);
  }, [])

  const logoutHandler = async() => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    };

    const response = await fetch('/logout', options);
    const jsonData = await response.json();

    setLoginStatus(false);

    if(jsonData.login === false) {
      console.log(jsonData);
      navigate('/');
    } else {
      console.log(jsonData);
    }
  }

  return (
    <div className='Navbar'>
      <div data-testid="text" className='Logo' onClick={() => navigate('/')}>
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
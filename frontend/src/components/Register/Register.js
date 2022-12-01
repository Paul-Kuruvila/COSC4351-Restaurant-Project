import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [validCred, setValidity] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => { //sending data
		e.preventDefault();
    const userInfo = {username, password, email, phoneNum};
		const options = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			//credentials: "include",
			body: JSON.stringify(userInfo)
		};

		const response = await fetch('/register', options);
    navigate('/');
	}

  return (
    <div className='Register'>
      <div style={{height: '5rem'}}></div>
      <form onSubmit = {handleSubmit}>
        <ul className="information-boxes">
          <label className='container-title'>REGISTER</label>
          <p className='container-description'>Your reservation has been successful and we're so excited you'll be joining us!<br />Please consider registering with us for a faster reservation process!<br />Note that a there will be a $10 no-show fee if we are not notified of a cancellation 24 hours in advance. </p>
          <ul className='boxes-container'>
            <li className='guest-info'>
              <label className='Label'>Username:</label>
              <input id='username' className='inputbox' type='text' minLength="2" maxLength="50" title='Please enter the username you will use to sign in.' required placeholder='Enter a desired username.'
              onChange = {(e) => setUsername(e.target.value)}
              onSelect = {() => setValidity(true)}
              />
            </li>
            <li className='guest-info'>
              <label className='Label'>Password:</label>
              <input id='password' className='inputbox' type='password' minLength="2" maxLength="50" title='Please enter the password you will use to sign in.' required placeholder='Enter a password.'
              onChange = {(e) => setPassword(e.target.value)}
              onSelect = {() => setValidity(true)}
              />
            </li>
            <li className='guest-info'>
              <label className='Label'>Email:</label>
              <input className='inputbox' type='text' title='Please enter your email.' minLength="4" maxLength="50" required placeholder='Enter your email.'
              onChange = {(e) => setEmail(e.target.value)}
              />
            </li>
            <li className='guest-info'>
              <label className='Label'>Phone Number:</label>
              <input className='inputbox' type='text' title='Please enter your phone number.' minLength="10" maxLength="10" required placeholder='Enter your phone number.'
              onChange = {(e) => setPhoneNum(e.target.value)}
              />
            </li>
          </ul>
          <li>
            <label className={validCred ? 'hide' : 'showInvalid'}>Username already exists. Please try another one.</label>
          </li>
          <li>
            <button className='Submit' type='submit'>Register</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default Register;
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
		const options = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			//credentials: "include",
			//body: JSON.stringify(loginData)
		};

		const response = await fetch('/register', options);
	}

  return (
    <div className='Register'>
      <div style={{height: '5rem'}}></div>
      <form onSubmit = {handleSubmit}>
        <ul className="information-boxes">
          <label className='container-title'>REGISTER</label>
          <text className='container-description'>We're so excited you'll be joining us!<br />Please enter your desired credentials.</text>
          <ul className='boxes-container'>
            <li className='guest-info'>
              <label className='Label'>Username:</label>
              <input id='username' className='inputbox' type='text' title='Please enter the username you will use to sign in.' required placeholder='Enter a desired username.'
              onChange = {(e) => setUsername(e.target.value)}
              onSelect = {() => setValidity(true)}
              />
            </li>
            <li className='guest-info'>
              <label className='Label'>Password:</label>
              <input id='password' className='inputbox' type='password' title='Please enter the password you will use to sign in.' required placeholder='Enter a password.'
              onChange = {(e) => setPassword(e.target.value)}
              onSelect = {() => setValidity(true)}
              />
            </li>
            <li className='guest-info'>
              <label className='Label'>Email:</label>
              <input className='inputbox' type='text' title='Please enter your email.' required placeholder='Enter your email.'
              onChange = {(e) => setEmail(e.target.value)}
              />
              <text className='optional-text'>(Optional)</text>
            </li>
            <li className='guest-info'>
              <label className='Label'>Phone Number:</label>
              <input className='inputbox' type='text' title='Please enter your phone number.' required placeholder='Enter your phone number.'
              onChange = {(e) => setPhoneNum(e.target.value)}
              />
              <text className='optional-text'>(Optional)</text>
            </li>
          </ul>
          <li>
            <label className={validCred ? 'hideInvalid' : 'showInvalid'}>Username already exists. Please try another one.</label>
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
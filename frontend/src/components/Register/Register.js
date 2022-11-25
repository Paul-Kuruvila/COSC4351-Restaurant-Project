import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validCred, setValidity] = useState(true);

  const redirectHandler = (ref) => {
		window.location.href=`${ref}`;
	}

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
      <form onSubmit = {handleSubmit}>
        <ul className="information-boxes">
          <li className='usernameArea'>
            <label className="Label">Username:</label>
            <input id="username" className="inputbox" type="text" title="Please enter the username you will use to sign in." required placeholder="Enter a desired username."
            onChange = {(e) => setUsername(e.target.value)}
            onSelect = {() => setValidity(true)}
            />
          </li>
          <li className='passwordArea'>
            <label className="Label">Password:</label>
            <input id="password" className="inputbox" type="password" title="Please enter the password you will use to sign in." required placeholder="Enter a password."
            onChange = {(e) => setPassword(e.target.value)}
            onSelect = {() => setValidity(true)}
            />
          </li>
          <li>
            <label className={validCred ? "hideInvalid" : "showInvalid"}>Username already exists. Please try another one.</label>
          </li>
          <li>
            <button className="Submit" type="submit">Register</button>
          </li>
          <div className="Login-Options">
            <p>Don't have an account?
              <br/><a href="/register">Sign up here</a>.
            </p>
          </div>
        </ul>
      </form>
    </div>
  )
}

export default Register;
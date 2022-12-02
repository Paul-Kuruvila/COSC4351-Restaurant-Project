import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validCred, setValidity] = useState(true);
  const [LoggedIn, setLoginStatus] = useState(false);

  const handleSubmit = async (e) => { //sending data
    e.preventDefault();
    const loginData = {username, password};
    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        //credentials: "include",
        body: JSON.stringify(loginData)
    };

    const response = await fetch('/auth', options)
    const jsonData = await response.json();

    setValidity(jsonData.login);
    setLoginStatus(jsonData.loginstatus)
      
    if (jsonData.login) { //if login status is true/successful
        console.log(jsonData);
        navigate('/') //redirect to home page
        document.location.reload('true');
    } else {
        console.log(jsonData);
    }
  }

  return (
    <div className="Login">
        <div style={{height: '5rem'}}></div>
        <form onSubmit = {handleSubmit}>
            <ul className="information-boxes">
                <label className='container-title'>LOGIN</label>
                <ul className='boxes-container'>
                    <li className='guest-info'>
                        <label className="Label">Username:</label>
                        <input id="username" className="inputbox" type="text" title="Please enter your username." minLength="2" maxLength="50" required placeholder="Enter your username."
                        onChange = {(e) => setUsername(e.target.value)}
                        onSelect = {() => setValidity(true)}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Password:</label>
                        <input id="password" className="inputbox" type="password" title="Please enter your password." minLength="2" maxLength="50" required placeholder="Enter your password."
                        onChange = {(e) => setPassword(e.target.value)}
                        onSelect = {() => setValidity(true)}
                        />
                    </li>
                </ul>
                <li>
                    <label className={validCred ? "hide" : "showInvalid"}>{LoggedIn ? <p>You are already logged in!<br/>Please sign out before proceeding.</p> : 'Invalid username/password. Please try again.' }</label>
                </li>
                <li>
                    <button className="Submit" data-testid="button" type="submit">Login</button>
                </li>
                <div className="Login-Options">
                    <p>Don't have an account?
                        <br/><a href="/register">Sign up here</a>.
                    </p>
                </div>
            </ul>
        </form>
    </div>
  );
}

//SUBMIT BUTTON type = "submit" previously for validation, temporarily set to "button" to link to the other pages


export default Login;
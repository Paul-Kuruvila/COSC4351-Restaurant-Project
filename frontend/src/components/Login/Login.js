import './Login.css';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validCred, setValidity] = useState(true);

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
      
      if (jsonData.login) { //if login status is true/successful
          console.log(jsonData);
          navigate.push('/') //redirect to home page
          document.location.reload('true');
      }
      else {
          console.log(jsonData);
      }
  }
  return (
      <div className="Login">
          <form onSubmit = {handleSubmit}>
              <ul className="signup-boxes">
                  <li className='usernameArea'>
                      <label className="userLabel">Username:</label>
                      <input id="username" className="inputbox" type="text" title="Please enter your username." required placeholder="Enter your username."
                      onChange = {(e) => setUsername(e.target.value)}
                      onSelect = {() => setValidity(true)}
                      />
                  </li>
                  <li className='passwordArea'>
                      <label className="passLabel">Password:</label>
                      <input id="password" className="inputbox" type="password" title="Please enter your password." required placeholder="Enter your password."
                      onChange = {(e) => setPassword(e.target.value)}
                      onSelect = {() => setValidity(true)}
                      />
                  </li>
                  <li>
                      <label className={validCred ? "hideInvalid" : "showInvalid"}>Invalid username/password. Please try again.</label>
                  </li>
                  <li>
                      <button className="Submit" type="submit">Login</button>
                  </li>
                  <div className="signup-text">
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

// import React from 'react';

// const Login = () => {
//   return (
//     <div className='Login'>
        
//     </div>
//   );
// }

export default Login;
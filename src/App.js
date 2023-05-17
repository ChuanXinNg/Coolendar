import React, { useState } from "react";
import coolendarLogo from './Coolendar logo.jpg';
import './App.css';

function App() {
  const [user, setUserPair] = useState({});

  const findPassword = (email) => {
    return user[email];
  };

  function signUp() {
    const email = document.getElementById('user-email');
    const password = document.getElementById('user-password');

    if (email !== '' && password !== '') {
      const updatedUserPairs = { ...user, [email]: password };
      setUserPair(updatedUserPairs);
    } else {
      const element = document.createElement('div');
      element.innerText = 'Invalid input!';
      reset(element);
    }

    console.log('sign up');

    // Clear input fields after signing up
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = '';  

  }
    
  function logIn() {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    const pwd = findPassword(email);

    const element = document.createElement('div');

    console.log('log in');

    if (pwd !== undefined) {
      if (pwd !== password) {
        element.innerText = 'Wrong password!';
      } else {
        element.innerText = 'Successfully logged in!';
      }
    } else {
      element.innerText = 'Invalid Email!';
    }
    
    reset(element);
  }

  function reset(element) {
    // Clear input fields after signing up
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = ''; 
    const user = document.getElementById('testing');
    user.innerHTML = ''; // Clear existing content
    user.appendChild(element);
  }

  
  return (
    <div className="CoolendarLogin-App">
      <header className="AppLogin-header">
        <img src={coolendarLogo} className="App-logo" alt="logo" />

        
        <div className="login-form">
          <div className="login-title">Sign In</div>
          
          <div className="login-container">
            <div className="enterLogin">Email:</div>
            <input
            id="user-email"
            type="text"
            className="login-inputContainer"
            placeholder="Enter your Email here"
            />
          </div>

          <div className="login-container">
            <div className="enterLogin">Password:</div>
            <input
              id="user-password"
              type="password"
              className="login-inputContainer"
              placeholder="Enter your password here"
            />
          </div>

          <div>
            <button className="sign-in-buttons" onClick={logIn}>Log In</button>
          </div>

          <div>
            <button className="sign-in-buttons" onClick={signUp}>Sign Up</button>
          </div>

        </div>

        <div id="testing"></div>

      </header>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import Calendar from 'react-calendar'; 
import coolendarLogo from './Coolendar logo.jpg';
import './App.css';

function App() {
  const [user, setUserPair] = useState({});
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const [date, setDate] = useState(new Date());

  function signUp() {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

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

    // Perform login verification
    if (email !== '' && password !== '') {
      const pwd = user[email];

      if (pwd !== undefined) {
        if (pwd !== password) {
          alert('Wrong password!');
        } else {
          setLoggedIn(true); // Set login state to true
        }
      } else {
        alert('Invalid email!');
      }
    } else {
      alert('Please enter email and password!');
    }
  }

  function reset(element) {
    // Clear input fields after signing up
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = ''; 
    const user = document.getElementById('testing');
    user.innerHTML = ''; // Clear existing content
    user.appendChild(element);
  }

  if (loggedIn) {
    return (
      <div className="Coolendar-App">
        <div className="header">
          <img className="App-logo" src={coolendarLogo} alt="logo" />
        </div>

        <div>
          <div className="calendar-container">
            <Calendar className="calendar" onChange={setDate} value={date} selectRange={true} />
          </div>
          <div className="text-center">
            Selected date: {date.toDateString()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="CoolendarLogin-App">
      <header className="AppLogin-header">
        <img src={coolendarLogo} className="AppLogin-logo" alt="logo" />

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

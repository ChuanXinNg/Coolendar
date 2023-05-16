import React, { useState } from "react";
import coolendarLogo from './Coolendar logo.jpg';
import './App.css';

function App() {
  const [email, setEmail] = useState('Email is not filled');
  const [password, setPassword] = useState('Password is not filled');
  const [loginStatus, setLoginStatus] = useState('');

  const logInButtonHandler = () => {
    setLoginStatus('You have successfully logged in with ' + email);
  };

  const signUpButtonHandler = () => {
    setLoginStatus(
      'You have successfully signed up with ' +
        email +
        ' and your password is ' +
        password
    );
  };

  const clearButtonHandler = () => {
    setEmail('Email is not filled');
    setPassword('Password is not filled');
    setLoginStatus('');
  };

  return (
    <div className="Coolendar-App">
      <header className="App-header">
        <img src={coolendarLogo} className="App-logo" alt="logo" />

        <div className="login-form">
          <div className="title">Sign In</div>
        </div>

        <div className="container">
          <h2>Enter Email:</h2>
          <input
            type="text"
            className="inputContainer"
            placeholder="Enter your Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h2>Enter password:</h2>
          <input
            type="password"
            className="inputContainer"
            placeholder="Enter your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p>{loginStatus}</p>

          <div className="buttonContainer">
            <button onClick={logInButtonHandler}>Log In</button>
          </div>

          <div className="buttonContainer">
            <button onClick={signUpButtonHandler}>Sign Up</button>
          </div>

          <div className="buttonContainer">
            <button onClick={clearButtonHandler}>Clear</button>
          </div>

          <p>--------------------</p>
          <p>For checking purpose</p>
          <p>Current Email: {email}</p>
          <p>Current Password: {password}</p>
        </div>

      </header>
    </div>
  );
}

export default App;
import React from "react";
import coolendarLogo from './images/Coolendar logo.jpg';
import './css/login.css';

function loginScreen() {
  
  function signUp() {
    console.log('sign up');

    // Clear input fields after signing up
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = ''; 
  }

  function logIn() {
    console.log("logged in");
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


          <div className="text-forgot">          
            <div className="remember-me">
                <input type="checkbox"/>
                Remember me
            </div>

            <span className="forgot-password">Forgot password?</span>

          </div>
          
          <div>
            <button className="sign-in-buttons" onClick={logIn}>Log In</button>
          </div>

          <div className="no-account">
            Don&#39;t have an account? 
            <span className="sign-up" onClick={signUp}> Sign up</span>
          </div>

        </div>

        <div id="testing"></div>
      </header>
    </div>
  );

}

export default loginScreen;
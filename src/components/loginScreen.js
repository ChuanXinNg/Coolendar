import React from "react";
import coolendarLogo from './images/Coolendar logo.jpg';
import './css/login.css';
import '../supabase'

function loginScreen() {

  function signUp() {
    console.log('sign up');
  }

  function logIn() {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value; 
    const remember = document.getElementById('remember').checked;
    const userDetails = {
      email: email,
      password: password,
      remember: remember
    };

    console.log(userDetails);
    console.log("logged in");

    clear();
  }

  function forgotPassword() {
    console.log("forgot password");
  }

  function clear() {
    // Clear input fields after signing up
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = ''; 
    document.getElementById('remember').checked = false;
  }

  return (
    <div className="CoolendarLogin-App">
      <header className="AppLogin-header">
        <img src={coolendarLogo} className="AppLogin-logo" alt="logo" />

        <div className="login-form">
          <div className="login-title">Sign In</div>
          
          <input
              id="user-email"
              type="text"
              className="login-inputContainer"
              placeholder="Email"
            />
          
          <input
            id="user-password"
            type="password"
            className="login-inputContainer"
            placeholder="Password"
          />


          <div className="text-forgot">          
            <div className="remember-me">
              <input id="remember" type="checkbox"/>
              Remember me
            </div>

            <span className="forgot-password" onClick={forgotPassword}>
              Forgot password?
            </span>

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
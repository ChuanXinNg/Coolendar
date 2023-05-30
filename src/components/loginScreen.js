import React, { useState } from "react";
import coolendarLogo from './images/Coolendar logo.jpg';
import './css/signup.css';
import {supabase} from "../supabase";
import { Link, useNavigate } from "react-router-dom";

function loginScreen({setToken}) {

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function handleLogin(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error;
      }
      console.log(data);
      setToken(data);
      navigate('/coolendar');
        
    } catch (error) {
      alert(error.message);
    }
  }

  function forgotPassword() {
    console.log("forgot password");
  }


  return (
    <div className="page">
      <img src={coolendarLogo} className="logo" alt="Coolendar Logo" />

        <form className="form" onSubmit={handleSubmit}>
          <div className="title">Sign In</div>
          <input id="email" className="user-details" type='text' name="email" placeholder="Email" onChange={handleLogin}/>
          <input id="password" className="user-details" type='password' name="password" placeholder="Password" onChange={handleLogin}/>
          <button className="submit" type='submit'>Log in</button>
        </form>

        <div className="no-account">
          <span className="forgot-password" onClick={forgotPassword}>
            Forgot password?
          </span>
          <div className="account">
            Don&#39;t have an account? 
            <span className="sign-up"> <Link to="/signup">Sign up</Link></span>
          </div>
        </div>
    </div>

    


  );

}

export default loginScreen;
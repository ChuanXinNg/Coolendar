import React, { useState } from "react";
import coolendarLogo from './images/Coolendar logo.jpg';
import { supabase } from '../supabase';
import './css/signup.css';
import { Link } from "react-router-dom";

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleSignUp(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.email === "" || formData.name === "" || formData.password === "") {
      alert('Please enter your personal details');
    } else {
      try {
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name
            }
          }
        });
        alert("Check your email for verification link");
      } catch (error) {
        alert(error.message);
      }
    }
  }

  console.log(formData);

  return (
    <div className="page">
      <img src={coolendarLogo} className="logo" alt="Coolendar Logo" />
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="signup-title">Sign Up</div>
        <input className="user-details" type='text' name="name" placeholder="Name" onChange={handleSignUp} />
        <input className="user-details" type='text' name="email" placeholder="Email" onChange={handleSignUp} />
        <input className="user-details" type='password' name="password" placeholder="Password" onChange={handleSignUp} />
        <button className="submit" type='submit'>Submit</button>
      </form>
      <div className="have-account">
        Already have an account? 
        <span className="sign-in"> <Link to="/">Sign in</Link> </span>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import coolendarLogo from './images/Coolander logo light cropped.png';
import {supabase} from "../supabase";
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

    try {
      const {data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });
      if (error) {
        throw error;
      }
      alert("Check your email for verification link");
      console.log(data);
      reset();
        
    } catch (error) {
      alert(error.message);
    }
  }

  console.log(formData);

  function reset() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  }

  return (
    <div className="page">
      <img src={coolendarLogo} className="logo" alt="Coolendar Logo" />
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Sign Up</div>
        <input id="name" className="user-details" type='text' name="name" placeholder="Name" onChange={handleSignUp} />
        <input id="email" className="user-details" type='text' name="email" placeholder="Email" onChange={handleSignUp} />
        <input id="password" className="user-details" type='password' name="password" placeholder="Password" onChange={handleSignUp} />
        <button className="submit" type='submit'>Submit</button>
      </form>
      <div className="account">
        Already have an account? 
        <span className="sign-in"> <Link to="/">Sign in</Link> </span>
      </div>
    </div>
  );
}

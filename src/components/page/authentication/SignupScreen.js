import React, { useState } from "react";
import { Link } from "react-router-dom";
import coolendarLogo from "../../images/Coolendar logo  removed background - light.png";
import { supabase } from "../../../supabase";
import "../../css/signup.css";


export default function SignupScreen() {
  const [formData, setFormData] = useState({
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      alert("Check your email for verification link, if you did not recieve any email, then you already have an account under this email");
      console.log(data);
      reset();

    } catch (error) {
      alert(error.message);
    }
  }

  console.log(formData);

  function reset() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    setFormData({
      email: "",
      password: ""
    });
  }

  return (
    <div className="page">
      <img src={coolendarLogo} className="signuplogo" alt="Coolendar Logo" />

      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Sign Up</div>
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../../images/Coolendar logo  removed background - dark.png";
import { supabase } from "../../../supabase";
import "../../css/signup.css";


export default function SignupScreen() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  
  function toSignIn() {
    navigate('/');
  }

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
        password: formData.password
      });

      if (data?.user?.identities?.length === 0) {
        alert("this user already exist");
      } else if (error) {
        throw error;
      } else {
        alert("Check your email for verification link");
      }

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
        Already have an account? {'     '}
        <span className="sign-in" onClick={toSignIn}>Sign in</span>
      </div>
    </div>
  );
}

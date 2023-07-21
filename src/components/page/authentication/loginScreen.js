import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../../images/Coolendar logo  removed background - dark.png";
import { supabase } from "../../../supabase";
import "../../css/signup.css";

function loginScreen({ setToken }) {

  let navigate = useNavigate();

  const [forgotpassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState({
    email: ""
  });
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
    setForgotPassword(true);
  }

  function handleEmail(event) {
    const { name, value } = event.target;
    setEmail(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleEmailSubmit(event) {
    event.preventDefault();
  
    try {
      
      let { data, error } = await supabase.auth.resetPasswordForEmail(email.email);
  
      if (error) {
        throw error;
      }
      console.log(data);
      setForgotPassword(false);
    } catch (error) {
      alert(error.message);
    }
  }
  

  return (
    <div className="page">
      <img src={coolendarLogo} className="signuplogo" alt="Coolendar Logo" />

      {forgotpassword ? (
        <form className="form" onSubmit={handleEmailSubmit}>
        <div className="title">Forgot Password</div>
        <input id="email" className="user-details" type='text' name="email" placeholder="Email" onChange={handleEmail} />
        <button className="submit" type='submit'>Submit</button>
      </form>
      ) : (
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="title">Sign In</div>
            <input id="email" className="user-details" type='text' name="email" placeholder="Email" onChange={handleLogin} />
            <input id="password" className="user-details" type='password' name="password" placeholder="Password" onChange={handleLogin} />
            <button className="submit" type='submit'>Log in</button>
          </form>

          <div className="no-account">
            <span className="forgot-password" onClick={forgotPassword}>
              Forgot password?
            </span>
            <div className="account">
              Don&#39;t have an account?
              <span className="sign-in" onClick={() => navigate('/signup')}> Sign up</span>
            </div>
          </div>
        </div>
      )}
    
    </div>




  );

}

export default loginScreen;
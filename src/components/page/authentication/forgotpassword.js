import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../../images/Coolendar logo  removed background - light.png";
import { supabase } from "../../../supabase";
import "../../css/signup.css";


function forgotPassword() {

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

      const { data, error } = await supabase.auth.updateUser({
        email: formData.email,
        password: formData.password
      })

      if (error) {
        throw error;
      }
      console.log(data);
      navigate('/');

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="page">
      <img src={coolendarLogo} className="signuplogo" alt="Coolendar Logo" />

        <form className="form" onSubmit={handleSubmit}>
          <div className="title">Reset Password</div>
          <input id="email" className="user-details" type='text' name="email" placeholder="Email" onChange={handleLogin} />
          <input id="password" className="user-details" type='password' name="password" placeholder="Password" onChange={handleLogin} />
          <button className="submit" type='submit'>submit</button>
        </form>
    </div>
  );

}

export default forgotPassword;
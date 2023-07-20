import React from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../images/Coolendar logo  removed background - light.png";
import "../css/Logo.css"

// eslint-disable-next-line react/prop-types
function Logo({ token }) {
  const navigate = useNavigate();
  
  function toUserScreen() {
    navigate('/user');
  }

  return (


    <div className="logo">
      <img className="logo-img" src={coolendarLogo} alt="logo" onClick={toUserScreen} />
      {/* eslint-disable-next-line react/prop-types */}
      <div className="welcome">Welcome {token.user.user_metadata.name}</div>
    </div>
  );
}

export default Logo;
import React from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../images/Coolendar logo light cropped.png";

function Logo() {
  const navigate = useNavigate();
  
  function toUserScreen() {
    navigate('/user');
  }

  // const imageStyle = {
  //   height: "80px",
  //   float: "left",
  //   display: "block"
  // };

  return (
    <div>
      <img className="App-logo" src={coolendarLogo} alt="logo" onClick={toUserScreen} />
    </div>
  );
}

export default Logo;

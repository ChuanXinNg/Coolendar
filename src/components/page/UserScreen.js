import React from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../images/Coolendar logo light cropped.png";
// ori: import coolendarLogo from "./images/Coolendar logo light cropped.png";
import "../css/user.css";
// ori: import "./css/user.css";

function calendarScreen({ token }) {

  let navigate = useNavigate();

  function handleLogOut() {
    sessionStorage.removeItem('token');
    navigate('/');

  }

  function back() {
    navigate('/coolendar');
  }

  console.log(token);

  return (
    <div className="Coolendar-App">
      <div>
        <img className="App-logo" src={coolendarLogo} alt="logo" onClick={back} />
      </div>
      <div className="header"> Hi, {token.user.user_metadata.name}</div>

      <div>
        <button className="button" onClick={handleLogOut}>Log out</button>
        <button className="button" onClick={back}>Back</button>
      </div>
    </div>
  );

}

export default calendarScreen;

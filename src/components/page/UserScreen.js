import React from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../images/Coolendar logo light cropped.png";
import "../css/user.css";

function calendarScreen({ token }) {

  let navigate = useNavigate();

  function handleLogOut() {
    sessionStorage.removeItem('token');
    navigate('/');

  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  console.log(token);

  return (
    <div className="Coolendar-App">
      <div>
        <img className="App-logo" src={coolendarLogo} alt="logo" onClick={() => handleNavigation("/coolendar")} />
      </div>
      <div className="header"> Hi, {token.user.user_metadata.name}</div>

      <div>
        <button className="button" onClick={() => handleNavigation("/coolendar")}>Home</button>
        <button className="button" onClick={() => handleNavigation("/newevent")}>New Event</button>
        <button className="button" onClick={() => handleNavigation("/todo")}>New Todo</button>
        <button className="button" onClick={() => handleNavigation("/note")}>New Notes</button>
        <button className="button" onClick={() => handleNavigation("/diary")}>New Diary</button>
        {/* to create new diary(no need password), not to diary display page(need password) */}

        <button className="button" onClick={() => handleNavigation("/ProfilePage")}>Go to Profile</button>
        <button className="logoutbutton" onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  );

}

export default calendarScreen;

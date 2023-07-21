import React, { useState } from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";

import profileIcon from "../icons/black icons/profile black icon.png";
import todoIcon from "../icons/black icons/todo black icon.png";
import homeIcon from "../icons/black icons/home black icon.png";
import noteIcon from "../icons/black icons/note black icon.png";
import diaryIcon from "../icons/black icons/diary black icon.png";

import whiteProfile from "../icons/white icons/profile white icon.png"
import whiteTodo from "../icons/white icons/todo white icon.png"
import whiteHome from "../icons/white icons/home white icon.png"
import whiteNote from "../icons/white icons/note white icon.png"
import whiteDiary from "../icons/white icons/diary white icon.png"

function Navbar() {
  const navigate = useNavigate();

  const [light, setLight] = useState(true);


  const handleNavigation = (path) => {
    navigate(path);
  };

  
  function changeMode() {
    setLight(!light);
  }

  // icons
  return (
    <nav>
      {light ? (
      <ul>
      <li>
        <button className="navbutton" onClick={() => handleNavigation("/ProfilePage")}>
          <img className="navicon" src={profileIcon} alt="Todo" />
        </button>
      </li>
      <li>
        <button className="navbutton" onClick={() => handleNavigation("/todo")}>
          <img className="navicon" src={todoIcon} alt="Todo" />
        </button>
      </li>
      <li>
        <button className="navbutton" onClick={() => handleNavigation("/coolendar")}>
          <img className="navicon" src={homeIcon} alt="Home" />
        </button>
      </li>
      <li>
        <button className="navbutton" onClick={() => handleNavigation("/note")}>
          <img className="navicon" src={noteIcon} alt="Notes" />
        </button>
      </li>
      <li>
        <button className="navbutton" onClick={() => handleNavigation("/diary-calendar")}>
          <img className="navicon" src={diaryIcon} alt="Diary" />
        </button>
      </li>
    </ul>
      ):(
        <ul>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/ProfilePage")}>
            <img className="navicon" src={whiteProfile} alt="Todo" />
          </button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/todo")}>
            <img className="navicon" src={whiteTodo} alt="Todo" />
          </button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/coolendar")}>
            <img className="navicon" src={whiteHome} alt="Home" />
          </button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/note")}>
            <img className="navicon" src={whiteNote} alt="Notes" />
          </button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/diary-calendar")}>
            <img className="navicon" src={whiteDiary} alt="Diary" />
          </button>
        </li>
      </ul>
      )}
      <button className="mode" onClick={changeMode}>Mode</button>

    </nav>
  );
}

export default Navbar;

import React from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";

// Import your icon images
import todoIcon from "../icons/black icons/todo black icon.png";
import homeIcon from "../icons/black icons/home black icon.png";
import noteIcon from "../icons/black icons/note black icon.png";
import diaryIcon from "../icons/black icons/diary black icon.png";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // icons
  return (
    <nav>
      <ul>
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
    </nav>
  );
}

export default Navbar;

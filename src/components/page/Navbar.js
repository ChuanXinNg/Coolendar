import React from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav>
      <ul>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/todo")}>Todo</button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/event")}>Event</button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/coolendar")}>Home</button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/note")}>Notes</button>
        </li>
        <li>
          <button className="navbutton" onClick={() => handleNavigation("/diary")}>Diary</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

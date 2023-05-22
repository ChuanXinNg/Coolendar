import React from "react";
import loginScreen from "./components/loginScreen";
import calendarScreen from "./components/calendarScreen";

function App() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <div>
        {calendarScreen()}
      </div>
    );
  } else {
    return (
      <div>
        {loginScreen()}
      </div>
    );
  }

}

export default App;

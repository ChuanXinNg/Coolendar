import React from "react";
import SignupScreen from "./components/SignupScreen";
import CalendarScreen from "./components/CalendarScreen";
import LoginScreen from "./components/LoginScreen";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<LoginScreen/>} />
        <Route path={"/signup"} element={<SignupScreen/>} />
        <Route path={"/calendar"} element={<CalendarScreen/>} />
      </Routes>
    </div>
  );
}

export default App;
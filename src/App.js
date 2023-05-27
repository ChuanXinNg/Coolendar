import React, { useEffect, useState } from "react";
import SignupScreen from "./components/SignupScreen";
import CoolendarScreen from "./components/CoolendarScreen";
import LoginScreen from "./components/LoginScreen";
import { Route, Routes } from "react-router-dom";
import { supabase } from "./supabase";


function App() {

  const [token, setToken] = useState(false);
  const [todo, setTodo] = useState([]);

  console.log(todo);

    if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  async function fetchData() {
    try {
      const { data } = await supabase
        .from('todo')
        .select('*');
      setTodo(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<LoginScreen setToken={setToken}/>} />
        <Route path={"/signup"} element={<SignupScreen/>} />
        {token ? <Route path={"/coolendar"} element={<CoolendarScreen token={token}/>} /> : ""}
      </Routes>
    </div>
  );
}

export default App;
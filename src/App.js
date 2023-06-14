import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { supabase } from "./supabase";
import SignupScreen from "./components/page/SignupScreen";
import CoolendarScreen from "./components/page/CoolendarScreen";
import LoginScreen from "./components/page/loginScreen";
import UserScreen from "./components/page/UserScreen";
import DiaryPage from "./components/page/DiaryPage";
import EventPage from "./components/page/EventPage";
import NotePage from "./components/page/NotePage";
import TodoPage from "./components/page/TodoPage";
import NewEventPage from "./components/page/NewEventPage";



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
        <Route path={"/"} element={<LoginScreen setToken={setToken} />} />
        <Route path={"/signup"} element={<SignupScreen />} />
        {token ? <Route path={"/coolendar"} element={<CoolendarScreen token={token} />} /> : ""}
        {token ? <Route path={"/diary"} element={<DiaryPage token={token} />} /> : ""}
        {token ? <Route path={"/event"} element={<EventPage token={token} />} /> : ""}
        {token ? <Route path={"/newevent"} element={<NewEventPage token={token} />} /> : ""}
        {token ? <Route path={"/note"} element={<NotePage token={token} />} /> : ""}
        {token ? <Route path={"/todo"} element={<TodoPage token={token} />} /> : ""}
        {token ? <Route path={"/user"} element={<UserScreen token={token} />} /> : ""}
      </Routes>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { supabase } from "./supabase";
import SignupScreen from "./components/page/authentication/SignupScreen";
import CoolendarScreen from "./components/page/CoolendarScreen";
import LoginScreen from "./components/page/authentication/loginScreen";
import EventPage from "./components/page/EventPage";
import NotePage from "./components/page/Note/NotePage";
import TodoPage from "./components/page/TodoPage";
import DiaryPageWithCalendar from "./components/page/Diary/DiaryPageWithCalendar";
import ProfilePage from "./components/page/ProfilePage";
import ForgotPassword from "./components/page/authentication/forgotpassword";


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
        <Route path={"/user/recover"} element={<ForgotPassword />} />
        {token ? <Route path={"/coolendar"} element={<CoolendarScreen token={token} />} /> : ""}
        {token ? <Route path={"/event"} element={<EventPage token={token} />} /> : ""}
        {token ? <Route path={"/note"} element={<NotePage token={token} />} /> : ""}
        {token ? <Route path={"/todo"} element={<TodoPage token={token} />} /> : ""}
        {token ? <Route path={"/ProfilePage"} element={<ProfilePage token={token} />} /> : ""}
        {token ? <Route path={"/diary-calendar"} element={<DiaryPageWithCalendar token={token} />} /> : ""}
      </Routes>
    </div>
  );
}

export default App;
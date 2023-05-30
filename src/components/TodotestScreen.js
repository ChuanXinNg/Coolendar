import React, { useState } from "react";
import coolendarLogo from './images/Coolendar logo.jpg';
import './css/App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function todotestScreen({token}) {

  let navigate = useNavigate();

  const [testtodo, setTesttodo] = useState({
    user_id:"",
    todo_task:"",
    todo_date:""
  });

  function handleLogin(event) {
    const { name, value } = event.target;
    setTesttodo(prevFormData => ({
      ...prevFormData,
      user_id: token.user.id,
      [name]: value
    }));
  }
  

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const todoData = {
        ...testtodo,
        token: token
      };
      await axios.post("http://localhost:8800/todotable", todoData);
      navigate("/coolendar");
    } catch (err) {
      console.log(err);
    }
  }
  

  console.log(token);

  function toUserScreen() {
    navigate('/user');
  }

    return (
      <div className="Coolendar-App">
        <div className="header">
          <img className="App-logo" src={coolendarLogo} alt="logo" onClick={toUserScreen}/>
          Hi, {token.user.user_metadata.name}, {token.user.id}
        </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="title">todo</div>
            <input type='text' name="todo_task" placeholder="todo_task" onChange={handleLogin}/>
            <input type='text' name="todo_date" placeholder="todo_date" onChange={handleLogin}/>
            <button className="submit" type='submit'>submit</button>
          </form>

      </div>
    );

}

export default todotestScreen;

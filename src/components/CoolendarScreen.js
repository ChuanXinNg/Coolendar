import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar'; 
import coolendarLogo from './images/Coolander logo light cropped.png';
import Todo from "./todo";
import './css/App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function calendarScreen({token}) {

  let navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [todoListVisible, setTodoListVisible] = useState(false);
  const [todo, setTodo] = useState([]);

  console.log(token);

  function toUserScreen() {
    navigate('/user');
  }

  useEffect(() => {
    const fetchtodo = async () => {
      try {
        const res = await axios.get("http://localhost:8800/todotable");
        console.log(res);
        setTodo(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchtodo();
  }, [])  

  function totestpage() {
    navigate("/todotest");
  }

    return (
      <div className="Coolendar-App">
        <div className="header">
          <img className="App-logo" src={coolendarLogo} alt="logo" onClick={toUserScreen}/>
          Welcome back, {token.user.user_metadata.name}
        </div>

        <div>
          <div className="calendar-container">
            <Calendar 
              className="calendar" 
              onChange={setDate} 
              value={date} 
              // selectRange={true} 
              onClickDay={() => setTodoListVisible(true)}
              />
          </div>
          {date.length > 0 ? (
            <p>
              <span>Start:</span>{' '} {date[0].toDateString()}
              &nbsp; to &nbsp;
              <span>End:</span> {date[1].toDateString()}
            </p>
                  ) : (
            <p>
              <span>Selected date:</span>{' '} {date.toDateString()}
            </p>
          )}

          <div className="todotry">
            {todo.map(t => (
              // eslint-disable-next-line react/jsx-key
              <div>
                {t.user_id}, {t.todo_task}, {t.todo_date}
              </div>
            ))}
          </div>

          <Todo todoListVisible={todoListVisible}/>

          <button onClick={totestpage}>try insert todo</button>

        </div>
      </div>
    );

}

export default calendarScreen;

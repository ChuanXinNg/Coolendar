import React, { useState } from "react";
import Calendar from 'react-calendar'; 
import coolendarLogo from './images/Coolendar logo.jpg';
import Todo from "./todo";
import './css/App.css';
import { useNavigate } from "react-router-dom";

function calendarScreen({token}) {

  let navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [todoListVisible, setTodoListVisible] = useState(false);

  console.log(token);

  function toUserScreen() {
    navigate('/user');
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

          <Todo todoListVisible={todoListVisible}/>

        </div>
      </div>
    );

}

export default calendarScreen;

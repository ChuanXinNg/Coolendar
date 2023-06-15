import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import coolendarLogo from "../images/Coolendar logo light cropped.png";
import Navbar from "./Navbar";
import TodoUndoneList from "./CoolendarList/TodoUndoneList";
import TodoDoneList from "./CoolendarList/TodoDoneList";
import EventTodayList from "./CoolendarList/EventTodayList";
import EventNext7daysList from "./CoolendarList/EventNext7daysList";
import "../css/App.css";


function CalendarScreen({ token }) {

  // i have no idea what this is
  CalendarScreen.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  // navigation purposes
  let navigate = useNavigate();

  function toUserScreen() {
    navigate('./user');
    console.log(token.user.id)
  }

  function toTodoScreen() {
    navigate('/todo');
  }

  function toEventScreen() {
    navigate('event');
  }

  const [date, setDate] = useState(new Date());


  return (
    <div className="Coolendar-App">
      <div className="header">
        <img className="App-logo" src={coolendarLogo} alt="logo" onClick={toUserScreen} />
        {/* Welcome back, {token.user.user_metadata.name}, {token.user.id} */}
        Welcome
      </div>

      <div>
        <div className="calendar-container">
          <Calendar
            className="calendar"
            onChange={setDate}
            value={date}
          // selectRange={true} 
          // onClickDay={() => setTodoListVisible(true)}
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

        <div className="todoList">
          <strong>Todo list</strong>
          <button onClick={() => toTodoScreen()}> To Todo </button>
          <div className="listTitle">
            <div> <strong> Undone Todo Tasks </strong> </div>
            <TodoUndoneList token={token} />
          </div>
          <div className="listTitle">
            <div> <strong> Done Todo Tasks </strong> </div>
            <TodoDoneList token={token} />
          </div>
        </div>

        <div className="eventList">
          <strong>Event list</strong>
          <button onClick={() => toEventScreen()}> To Event </button>
          <div className="listTitle">
            <div> <strong> Today&apos;s Event </strong> </div>
            <EventTodayList token={token} />
          </div>
          <div className="listTitle">
            <div> <strong> Next 7 Day&apos;s Events </strong> </div>
            <EventNext7daysList token={token} />
          </div>
        </div>

        {/* <Todo todoListVisible={todoListVisible} /> */}


      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div >

  );

}

export default CalendarScreen;
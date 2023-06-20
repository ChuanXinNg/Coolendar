import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import coolendarLogo from "../images/Coolendar logo light cropped.png";
import Navbar from "./Navbar";
import TodoUndoneList from "./CoolendarList/TodoUndoneList";
import TodoDoneList from "./CoolendarList/TodoDoneList";
import EventTodayList from "./CoolendarList/EventTodayList";
import EventNext7daysList from "./CoolendarList/EventNext7daysList";
import { format } from 'date-fns';
import "../css/App.css";


function CalendarScreen({ token }) {
  CalendarScreen.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  let navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log("Date changed:", date);
  }, [date]);

  // useEffect(() => {
  //   const button = document.getElementById("notifications");
  //   if (button) {
  //     button.addEventListener("click", requestNotificationPermission);
  //   }
  //   return () => {
  //     if (button) {
  //       button.removeEventListener("click", requestNotificationPermission);
  //     }
  //   };
  // }, []);

  // function requestNotificationPermission() {
  //   Notification.requestPermission().then((result) => {
  //     if (result === "granted") {
  //       randomNotification();
  //     }
  //   });
  // }

  // function randomNotification() {
  //   const notifTitle = "Coolendar";
  //   const notifBody = "Allow notifications?";
  //   const options = {
  //     body: notifBody,
  //   };
  //   new Notification(notifTitle, options);
  //   setTimeout(randomNotification, 30000);
  // }

  function toUserScreen() {
    navigate('/user');
    console.log(token.user.id);
  }

  function toTodoScreen() {
    navigate('/todo');
  }

  function toEventScreen() {
    navigate('/event');
  }

  return (
    <div className="Coolendar-App">
      <div className="header">
        <img className="App-logo" src={coolendarLogo} alt="logo" onClick={toUserScreen} />
        {/*eslint-disable-next-line react/prop-types*/}
        Welcome {token.user.user_metadata.name}
      </div>

      {/* <button id="notifications">notifications</button> */}

      <div>
        <div className="calendar-container">
          <Calendar
            className="calendar"
            onChange={setDate}
            value={date}
          />
        </div>
        {date instanceof Date && (
          <p>
            <span>Selected date:</span> {date.toDateString()}
          </p>
        )}
        {Array.isArray(date) && date.length > 0 && (
          <p>
            <span>Start:</span> {date[0].toDateString()} to&nbsp;
            <span>End:</span> {date[1].toDateString()}
          </p>
        )}

        <div className="todayData">
          <div className="todoList">
            <strong>Todo list</strong>
            <button onClick={toTodoScreen}>To Todo</button>
            <div className="listTitle">
              <div><strong>Undone Todo Tasks</strong></div>
              <TodoUndoneList token={token} />
            </div>
            <div className="listTitle">
              <div><strong>Done Todo Tasks</strong></div>
              <TodoDoneList token={token} date={date} />
            </div>
          </div>

          <div className="eventList">
            <strong>Event list</strong>
            <button onClick={toEventScreen}>To Event</button>
            <div className="listTitle">
              <div><strong>{format(date, 'yyyy-MM-dd')}&apos;s Event</strong></div>
              <EventTodayList token={token} date={date} />
            </div>
            <div className="listTitle">
              <div><strong>Next 7 Day&apos;s Events</strong></div>
              <EventNext7daysList token={token} date={date} />
            </div>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default CalendarScreen;

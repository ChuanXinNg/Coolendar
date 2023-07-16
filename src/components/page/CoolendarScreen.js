import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import Logo from "./Logo";
import Navbar from "./Navbar";
import TodoUndoneList from "./CoolendarList/TodoUndoneList";
import TodoDoneList from "./CoolendarList/TodoDoneList";
import EventTodayList from "./CoolendarList/EventTodayList";
import EventNext7daysList from "./CoolendarList/EventNext7daysList";
// import { format } from 'date-fns';
import { format, addDays, subDays, isSameDay, parseISO } from 'date-fns';
import { supabase } from '../../supabase';
import "../css/App.css";
// import { askForPermissionToReceiveNotifications } from '../../push-notification';

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
  const [eventsData, setEventsData] = useState([]);

  // useEffect(() => {
  //   askForPermissionToReceiveNotifications();
  // }, []);

  useEffect(() => {
    console.log("Date changed:", date);
    const fetchEventData = async () => {
      try {

          const user_id = token.user.id;
          const prevMonth = format(subDays(date, 30), 'yyyy-MM-dd');
          const nextMonth = format(addDays(date, 30),'yyyy-MM-dd');
          const { data, error } = await supabase
              .from('eventtable')
              .select(`event_name, event_date`)
              .order('event_date', { ascending: true })
              .gt('event_date', prevMonth)
              .lte('event_date', nextMonth)
              .eq('creator_id', user_id);

          console.log(data);

          if (error) {
              throw error;
          }

          setEventsData(data);
          console.log(data);

      } catch (err) {
          console.log(err);
      }
    }
    fetchEventData();
  }, [date]);

  function tileContent({ date, view }) {
    if (
      view === "month" &&
      eventsData.find((event) => isSameDay(parseISO(event.event_date), date))
    ) {
      const eventNames = eventsData
        .filter((event) => isSameDay(parseISO(event.event_date), date))
        .map((event) => event.event_name);
      return (
        <>
          {eventNames.map((eventName, index) => (
            <p key={index}>{eventName}</p>
          ))}
        </>
      );
    }
  }

  function tileClassName({ date }) {
    if (
      eventsData.find((event) => isSameDay(parseISO(event.event_date), date))
    ) {
      return "blue";
    }
  }
  

  function toTodoScreen() {
    navigate('/todo');
  }

  function toEventScreen() {
    navigate('/event');
  }

  return (
    <div className="Coolendar-App">
      <Logo token={token}/>
      <div className="content">
        <div className="calendar-container">
        <Calendar
          className="calendar"
          onChange={setDate}
          value={date}
          minDetail="decade"
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
        </div>
        
        {date instanceof Date && (
          <div>
            <span>Selected date:</span> {format(date, 'yyyy-MM-dd')}
          </div>
        )}

        <div className="todayData">
          <div className="todoList">
            <strong>Todo list</strong>
            <button className="toTodoButton" onClick={toTodoScreen}>To Todo</button>
            <div className="listTitle">
              <div><strong>Undone</strong></div>
              <TodoUndoneList token={token} />
            </div>
            <div className="listTitle">
              <div><strong>Done</strong></div>
              <TodoDoneList token={token} date={date} />
            </div>
          </div>

          <div className="eventList">
            <strong>Event list</strong>
            <button className="toTodoButton" onClick={toEventScreen}>Add Event</button>
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

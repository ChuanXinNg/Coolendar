import React, { useState } from "react";
import { supabase } from '../../supabase';
import Logo from "./Logo";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "../css/NewEvent.css";

function NewEventPage({ token }) {

  // i have no idea what this is
  NewEventPage.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  // navigation purposes
  let navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  // const insert
  const [event, setEvent] = useState({
    creator_id: "",
    event_name: "",
    event_info: "",
    event_date: "",
    event_time: ""
  });

  // button handler to setEvent for insert
  function handleEventChange(event) {
    const { name, value } = event.target;
    setEvent(prevFormData => ({
      ...prevFormData,
      creator_id: token.user.id,
      [name]: value
    }));
  }

  // button handler to Add Event
  async function handleAddEvent(e) {
    e.preventDefault();
    try {
      // Add new task
      const { data, error } = await supabase
        .from('eventtable')
        .insert([
          {
            creator_id: event.creator_id,
            event_name: event.event_name,
            event_info: event.event_info,
            event_date: event.event_date,
            event_time: event.event_time
          },
        ]);
      if (error) {
        throw error;
      }
      console.log(data);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="NewEventPage">
      <Logo />

      New Event

      {/* {tempo form} */}
      <form className="form" onSubmit={handleAddEvent}>
        <div className="title"> Add events form</div>
        <div>
          Event: <input type='text' name="event_info" placeholder="Add event here!" onChange={handleEventChange} />
        </div>
        <div>
          Date: <input type='date' name="event_date" onChange={handleEventChange} />
        </div>
        <div>
          Time: <input type='time' name="event_time" onChange={handleEventChange} />
        </div>
        <button className="submit" type='submit'>Add Event</button>
      </form>
      {/* {end of tempo form} */}

      <form className="form" onSubmit={handleAddEvent}>
        <input className="details" type="text" placeholder="Enter Event Title" />

        <input className="details" type="text" placeholder="Enter Details" />

        <div className="horizontal-scroll">
          <div className="RangeForm">
            Single Day Event
            <div>Date: <input type="date" /></div>
            <div>Time: <input type="time" /></div>
          </div>

          <div className="RangeForm">
            Multiple Days Event
            <div>Date: <input type="date" /></div>
            <div>Time: <input type="time" /></div>
          </div>

          <div className="RangeForm">
            Birthday/Festival
            <div>Date: <input type="date" /></div>
          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <input type="checkbox" /> Notifications
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <input type="checkbox" /> Alarms &emsp;
          <input type="time" />
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          Color: &emsp; <input type="color" />
        </div>

      </form>

      <div>
        <button onClick={() => handleNavigation("/home")}>
          Back to Home
        </button>
      </div>

      <div>
        <button onClick={() => handleNavigation("/event")}>
          Back to Event
        </button>
      </div>
    </div>
  );
}

export default NewEventPage;
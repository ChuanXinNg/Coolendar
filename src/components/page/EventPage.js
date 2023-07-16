import React, { useState } from "react";
import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import Logo from "./Logo";
import Navbar from "./Navbar";
// import { format } from 'date-fns';

function EventPage({ token }) {

  // i have no idea what this is
  EventPage.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
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

  // button handler to Add Event or Edit Event
  async function handleEvent(e) {
    e.preventDefault();
    try {
      if (event.event_name == "") {
        alert("Please enter event name");
      } else {
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
      }
    } catch (err) {
      console.log(err);
      alert("Fail to add event");
    }
  }

  return (
    <div className="Coolendar-App">
      <Logo token={token}/>
      <div className="content">

        <div>
            <form className="form" onSubmit={handleEvent}>
              <div className="title"> Add new Event </div>
              <div>
                Name:{" "}
                <input type="text"
                  name="event_name"
                  value={event.event_name}
                  onChange={handleEventChange} />
              </div>
              <div>
                Info:{" "}
                <input type="text"
                  name="event_info"
                  value={event.event_info}
                  onChange={handleEventChange} />
              </div>
              <div>
                Date:{" "}
                <input type="date"
                  name="event_date"
                  value={event.event_date}
                  onChange={handleEventChange} />
              </div>
              <div>
                Time:{" "}
                <input type="time"
                  name="event_time"
                  value={event.event_time}
                  onChange={handleEventChange} />
              </div>
              <button className="submit" type="submit">
                Add Event
              </button>
            </form>
        </div>

      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default EventPage;
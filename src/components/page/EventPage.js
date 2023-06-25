import React, { useState, useEffect } from "react";
import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import Logo from "./Logo";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
// import { format } from 'date-fns';

function EventPage({ token }) {
  // navigation purposes
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  // i have no idea what this is
  EventPage.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  // const select and delete
  const [eventTable, setEventTable] = useState([]);
  // const update
  const [editingEvent, setEditingEvent] = useState(null);
  // const insert
  const [event, setEvent] = useState({
    creator_id: "",
    event_name: "",
    event_info: "",
    event_date: "",
    event_time: ""
  });
  const [selectedEventContent, setSelectedEventContent] = useState('');

  // fetching data from database
  useEffect(() => {
    // const currentDate = format(date, 'yyyy-MM-dd');
    const fetchEventTable = async () => {
      try {
        const user_id = token.user.id;
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the format 'yyyy-MM-dd'
        const { data, error } = await supabase
          .from('eventtable')
          .select()
          .eq('creator_id', user_id)
          .gte('event_date', currentDate)
          .order('event_date', { decending: false });

        if (error) {
          throw error;
        }

        setEventTable(data.map(item => ({ ...item, id: item.id })));
        console.log(data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchEventTable();
  }, []);

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
      if (editingEvent) {
        // Update existing task
        await handleUpdateEvent(e);

      } else if (event.event_name == "") {
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

  // button handler to execute setEditingEvent and setEvent for update
  function handleEditEvent(e) {
    setEditingEvent(e);
    setEvent({
      creator_id: e.creator_id,
      event_name: e.event_name,
      event_info: e.event_info,
      event_date: e.event_date,
      event_time: e.event_time
    });
  }

  async function handleUpdateEvent(e) {
    e.preventDefault();
    if (event.event_name == "") {
      alert("Please enter event name");
    } else {
      try {
        const { data, error } = await supabase
          .from('eventtable')
          .update({
            event_name: event.event_name,
            event_info: event.event_info
          })
          .eq('id', editingEvent.id);

        if (error) {
          throw error;
        }

        console.log(data);
        location.reload();

        setEditingEvent(null);
        setEvent({
          creator_id: "",
          event_name: "",
          event_content: "",
          event_date: "",
          event_time: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleDeleteEvent(id) {
    try {
      const { data, error } = await supabase
        .from('eventtable')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      console.log(data);
      alert("This event will be deleted");

      const updatedEvent = eventTable.filter(item => item.id !== id);
      setEventTable(updatedEvent);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleTogglePin(id, pin) {
    try {
      const { data, error } = await supabase
        .from('eventtable')
        .update({ pin: !pin })
        .eq('id', id);

      if (error) {
        throw error;
      }

      console.log(data);

      const updatedEvent = eventTable.map(item => {
        if (item.id === id) {
          return { ...item, pin: !pin };
        }
        return item;
      });

      setEventTable(updatedEvent);
    } catch (err) {
      console.log(err);
    }
  }

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    let formattedHours = parseInt(hours, 10);
    if (formattedHours >= 0 && formattedHours < 10) {
      // morning before 10am
      return `0${formattedHours}:${minutes}am`;
    } else if (formattedHours >= 10 && formattedHours < 12) {
      // morning after 10am and before afternoon 12pm
      return `${formattedHours}:${minutes}pm`;
    } else if (formattedHours == 12) {
      // afternoon on 12pm
      return `${formattedHours}:${minutes}pm`;
    } else if (formattedHours > 12 && formattedHours < 22) {
      // afternoon after 12pm and before 10pm
      formattedHours = formattedHours - 12;
      return `0${formattedHours}:${minutes}pm`;
    } else if (formattedHours >= 22 && formattedHours < 24) {
      // afternoon after 10pm
      formattedHours = formattedHours - 12;
      return `${formattedHours}:${minutes}pm`;
    } else {
      return 'Bad Timing. Invalid Timing input.'
    }
  }

  // function for checkEvent
  async function checkEvent(event) {
    const idToCheck = event.target.id;
    console.log(event);

    try {
      const user_id = token.user.id;
      const { data, error } = await supabase
        .from('eventtable')
        .select()
        .eq('creator_id', user_id)
        .eq('id', idToCheck);

      if (error) {
        throw error;
      }

      if (data.length > 0) {
        const { event_date, event_time, event_name, event_info } = data[0];
        const formattedTime = formatTime(event_time);

        setSelectedEventContent(
          <React.Fragment>
            <div>Event Name: {event_name}</div>
            <div> Date: {event_date}, {formattedTime} </div>
            <div>{event_info}</div>
          </React.Fragment>
        );
      } else {
        setSelectedEventContent('');
      }


    } catch (err) {
      console.log(err);
    }
  }

  function handleCloseEvent() {
    setSelectedEventContent('');
  }


  return (
    <div style={{marginBottom: "50px"}}>
      <div><Logo /></div>

      <div id="neweventButton">
        <button onClick={() => handleNavigation("/newevent")}>
          Add Event
        </button>
      </div>
      <div>
        {editingEvent ? (
          <form className="form" onSubmit={handleUpdateEvent}>
            <div className="title"> Edit Event</div>
            <div>
              New Name:{" "}
              <input type="text"
                name="event_name"
                value={event.event_name}
                onChange={handleEventChange} />
            </div>
            <div>
              New Info:{" "}
              <input type="text"
                name="event_info"
                value={event.event_info}
                onChange={handleEventChange} />
            </div>
            <div>
              New Date:{" "}
              <input type="date"
                name="event_date"
                value={event.event_date}
                onChange={handleEventChange} />
            </div>
            <div>
              New Time:{" "}
              <input type="time"
                name="event_time"
                value={event.event_time}
                onChange={handleEventChange} />
            </div>
            <button className="submit" type="submit">
              Edit Event
            </button>
          </form>
        ) : (
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
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }} >

        Your Event List :)

        <div>
          {selectedEventContent && (
            <div>
              <b>Event info:</b>
              <div>{selectedEventContent}</div>
              <button
                style={{ marginLeft: '12px' }}
                onClick={handleCloseEvent}
              >Close</button>
            </div>
          )}
        </div>

        <div className="pinnedEventList">
          <b>Pinned Events:</b>
          {eventTable.map(x => (
            <div key={x.id}>
              {x.pin ? (
                <React.Fragment>
                  <div> Event Name: {x.event_name} </div>
                  <div> Due Date: {x.event_date}, {formatTime(x.event_time)} </div>
                  <button id={x.id} onClick={checkEvent}> Check </button>
                  <button onClick={() => handleDeleteEvent(x.id)}>Delete</button>
                  <button onClick={() => handleEditEvent(x)}>Edit</button>
                  <button onClick={() => handleTogglePin(x.id, x.pin)}>
                    {x.pin ? "Unpin this event" : "Pin this event"}
                  </button>
                </React.Fragment>
              ) : null}
            </div>
          ))}
        </div>

        <div className="eventlist">
          <b>All Events:</b>
          {eventTable.map(x => (
            <div key={x.id}>
              <div>Event Name: {x.event_name} </div>
              <div> Date: {x.event_date}, {formatTime(x.event_time)} </div>

              <button id={x.id} onClick={checkEvent}> Check </button>
              <button onClick={() => handleDeleteEvent(x.id)}>Delete</button>
              <button onClick={() => handleEditEvent(x)}>Edit</button>
              <button onClick={() => handleTogglePin(x.id, x.pin)}>
                {x.pin ? "Unpin this event" : "Pin this event"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default EventPage;
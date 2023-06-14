import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import Navbar from "./Navbar";
import Logo from "./Logo";

function EventPage({ token }) {

  // navigation purposes
  // let navigate = useNavigate();

  // i have no idea what this is (To check that token is valid)
  EventPage.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  // read data from database
  const [eventTable, setEventTable] = useState([]);
  useEffect(() => {
    const fetchEventTable = async () => {
      try {

        const user_id = token.user.id;
        const { data, error } = await supabase
          .from('eventtable')
          .select()
          .eq('creator_id', user_id);

        if (error) {
          throw error;
        }

        setEventTable(data);
        console.log(data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchEventTable();
  }, [])

  // const to insert todoTask
  const [event, setEvent] = useState({
    creator_id: "",
    event_info: "",
    event_date: "",
    event_time: ""
  });

  // function to handle changes to input
  function handleEventChange(event) {
    const { name, value } = event.target;
    setEvent(prevFormData => ({
      ...prevFormData,
      creator_id: token.user.id,
      [name]: value
    }));
  }

  // function to insert data to database
  async function handleAddEvent(e) {
    e.preventDefault();
    try {

      const { data, error } = await supabase
        .from('eventtable')
        .insert([
          {
            creator_id: event.creator_id,
            event_info: event.event_info,
            event_date: event.event_date,
            event_time: event.event_time
          },
        ])

      if (error) {
        throw error;
      }

      console.log(data);

      // automatic refresh the page
      location.reload();

    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div>
      <div> <Logo /> </div>

      <div>Add your events herre!</div>

      <form className="form" onSubmit={handleAddEvent}>
        <div className="title"> Add events form</div>
        <div>
          Event: <input type='text' name="event_info" placeholder="Add event here!" onChange={handleEventChange} />
        </div>
        <div>
          Due Date: <input type='date' name="event_date" onChange={handleEventChange} />
        </div>
        <div>
          Due Time: <input type='time' name="event_time" onChange={handleEventChange} />
        </div>
        <button className="submit" type='submit'>Add Event</button>
      </form>

      <div>EventPage</div>

      <div> Your Events :)</div>


      <div className="eventlist">
        {eventTable.map(x => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <div> Task: {x.event_info} </div>
            <div> Due Date: {x.event_date} </div>
            <div> Due Time: {x.event_time} </div>
          </div>
        ))}
      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default EventPage;
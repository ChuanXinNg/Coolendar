import React, { useState, useEffect } from "react";
import { supabase } from '../../../supabase';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function EventTodayList({ token, date }) {

    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedEventContent, setSelectedEventContent] = useState('');
    const [event, setEvent] = useState({
      creator_id: "",
      event_name: "",
      event_info: "",
      event_date: "",
      event_time: ""
    });

    // i have no idea what this is
    EventTodayList.propTypes = {
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
                const currentDate = format(date, 'yyyy-MM-dd');
                const { data, error } = await supabase
                    .from('eventtable')
                    .select()
                    .eq('event_date', currentDate)
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
    }, [date])

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

    function handleEditEvent(e) {
        setEditingEvent(e);
        setEvent({
          creator_id: e.creator_id,
          event_name: e.event_name,
          event_info: e.event_info  ,
          event_date: e.event_date,
          event_time: e.event_time
        });
    }      

    function handleEventChange(event) {
        const { name, value } = event.target;
        setEvent(prevFormData => ({
          ...prevFormData,
          creator_id: token.user.id,
          [name]: value
        }));
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

    return (

        <div className="eventTodayList">
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
          <div></div>
        )}
            {eventTable.length === 0 ? (
                <div>There is no event for the next 7 days!</div>
            ) : (
                eventTable.map(x => (
                    <div key={x.id} style={{margin: "5px", borderBottom:"solid", borderBottomWidth:"1px"}}>
                        <div style={{fontSize: "18px"}}> {x.event_name} </div>
                        <div> Date: {x.event_date} </div>
                        <div> Time: {formatTime(x.event_time)} </div>
                        <button id={x.id} onClick={checkEvent}> Check </button>
                        <button onClick={() => handleDeleteEvent(x.id)}>Delete</button>
                        <button onClick={() => handleEditEvent(x)}>Edit</button>
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
                    </div>
                ))
            )}
        </div>
    );

}

export default EventTodayList;
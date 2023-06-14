import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import Navbar from "./Navbar";
import Logo from "./Logo";

function NotePage({ token }) {

  // navigation purposes
  // let navigate = useNavigate();

  // i have no idea what this is (To check that token is valid)
  NotePage.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  // read data from database
  const [noteTable, setNoteTable] = useState([]);
  const [selectedNoteContent, setSelectedNoteContent] = useState('');
  useEffect(() => {
    const fetchNoteTable = async () => {
      try {

        const user_id = token.user.id;
        const { data, error } = await supabase
          .from('notetable')
          .select()
          .eq('creator_id', user_id);

        if (error) {
          throw error;
        }

        setNoteTable(data);
        console.log(data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchNoteTable();
  }, [])

  // const to insert todoTask
  const [notes, setNotes] = useState({
    creator_id: "",
    note_content: "",
    note_name: ""
  });

  // function to handle changes to input
  function handleNoteChange(event) {
    const { name, value } = event.target;
    setNotes(prevFormData => ({
      ...prevFormData,
      creator_id: token.user.id,
      [name]: value
    }));
  }

  // function to insert data to database
  async function handleAddNote(e) {
    e.preventDefault();
    console.log(notes);
    try {

      const { data, error } = await supabase
        .from('notetable')
        .insert([
          {
            creator_id: notes.creator_id,
            note_content: notes.note_content,
            note_name: notes.note_name
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
  
  async function checkNote(event) {
    const idToCheck = event.target.id;
    console.log(event);
  
    try {
      const user_id = token.user.id;
      const { data, error } = await supabase
        .from('notetable')
        .select()
        .eq('creator_id', user_id)
        .eq('note_name', idToCheck);
  
      if (error) {
        throw error;
      }
  
      if (data.length > 0) {
        setSelectedNoteContent(data[0].note_content);
      } else {
        setSelectedNoteContent('');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleCloseNote() {
    setSelectedNoteContent('');
  }
  

  return (
    <div>
      <div> <Logo /> </div>

      <div>Add your events herre!</div>

      <form className="form" onSubmit={handleAddNote}>
        <div className="title"> Add notes form</div>
        <div>
          Note: <input type='text' name="event_info" placeholder="Add notes here!" onChange={handleNoteChange} />
        </div>
        <div>
          Name: <input type='text' name="event_info" placeholder="Name" onChange={handleNoteChange} />
        </div>
        <button className="submit" type='submit'>Add Notes</button>
      </form>

      <div>NotePage</div>

      <div> Your Notes :)</div>


      <div className="eventlist">
        {noteTable.map(x => (
          <div key={x.note_name}>
            <div> Name: {x.note_name} </div>
            <button
              style={{ marginLeft: '12px' }}
              onClick={checkNote}
              id={x.note_name}
            > 
              Check {x.note_name}
            </button>
          </div>
        ))}
      </div>
      {selectedNoteContent && (
        <div>
          Selected Note Content:
          <div>{selectedNoteContent}</div>
          <button 
            style={{ marginLeft: '12px' }}
            onClick={handleCloseNote}
          >close</button>
        </div>
      )}
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default NotePage;
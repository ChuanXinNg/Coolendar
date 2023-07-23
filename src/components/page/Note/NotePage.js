import React, { useState, useEffect } from "react";
import { supabase } from '../../../supabase';
import PropTypes from 'prop-types';
import Logo from "../Logo";
import Navbar from "../Navbar";
import '../../css/notePage.css';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { useTheme } from '../../../theme/useTheme';
import { isEmpty } from "lodash";


function NotePage({ token }) {

  // i have no idea what this is
  NotePage.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  // const select and delete
  const [noteTable, setNoteTable] = useState([]);
  // const update
  const [editingNote, setEditingNote] = useState(null);
  // const insert
  const [note, setNote] = useState({
    creator_id: "",
    note_name: "",
    note_content: ""
  });
  const [selectedNoteContent, setSelectedNoteContent] = useState('');

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  // fetching data from database
  useEffect(() => {
    const fetchNoteTable = async () => {
      try {
        const user_id = token.user.id;
        const { data, error } = await supabase
          .from('notetable')
          .select()
          .eq('creator_id', user_id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setNoteTable(data.map(item => ({ ...item, id: item.id })));
        console.log(data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchNoteTable();
  }, []);

  // button handler to setNote for insert
  function handleNoteChange(event) {
    const { name, value } = event.target;
    setNote(prevFormData => ({
      ...prevFormData,
      creator_id: token.user.id,
      [name]: value
    }));
  }

  // button handler to Add Note or Edit Note Task
  async function handleNote(e) {
    e.preventDefault();
    try {
      if (editingNote) {
        // Update existing task
        await handleUpdateNote(e);
      } else if (note.note_content == "") {
        alert("Fail to update note. Please fill in all empty columns.");
      } else {
        // Add new task
        const { data, error } = await supabase
          .from('notetable')
          .insert([
            {
              creator_id: note.creator_id,
              note_name: note.note_name,
              note_content: note.note_content
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
    }
  }

  // button handler to execute setEditingNote and setNote for update
  function handleEditNote(n) {
    setEditingNote(n);
    setNote({
      creator_id: n.creator_id,
      note_name: n.note_name,
      note_content: n.note_content
    });
  }

  async function handleUpdateNote(e) {
    e.preventDefault();
    if (note.note_content == "") {
      alert("Fail to update note. Please fill in all empty columns.");
    } else {

      try {
        const { data, error } = await supabase
          .from('notetable')
          .update({
            note_name: note.note_name,
            note_content: note.note_content
          })
          .eq('id', editingNote.id);

        if (error) {
          throw error;
        }

        console.log(data);
        location.reload();

        setEditingNote(null);
        setNote({
          creator_id: "",
          note_name: "",
          note_content: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleDeleteNote(id) {
    try {
      const { data, error } = await supabase
        .from('notetable')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      console.log(data);
      alert("This note will be deleted");

      const updatedNote = noteTable.filter(item => item.id !== id);
      setNoteTable(updatedNote);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleTogglePin(id, pin) {
    try {
      const { data, error } = await supabase
        .from('notetable')
        .update({ pin: !pin })
        .eq('id', id);

      if (error) {
        throw error;
      }

      console.log(data);

      const updatedNote = noteTable.map(item => {
        if (item.id === id) {
          return { ...item, pin: !pin };
        }
        return item;
      });

      setNoteTable(updatedNote);
    } catch (err) {
      console.log(err);
    }
  }

  // function for checkNote
  async function checkNote(event) {
    const idToCheck = event.target.id;
    console.log(event);

    try {
      const user_id = token.user.id;
      const { data, error } = await supabase
        .from('notetable')
        .select()
        .eq('creator_id', user_id)
        .eq('id', idToCheck);

      if (error) {
        throw error;
      }

      if (data.length > 0) {
        const { note_name, note_content, last_edited_at } = data[0];

        const paragraphs = note_content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ));

        setSelectedNoteContent(
          <React.Fragment>
            <div>{note_name !== "" ? "Note: " + note_name : "Unnamed note"}</div>
            <div>Created on: {new Date(last_edited_at).toLocaleDateString()}, {new Date(last_edited_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            {paragraphs}
          </React.Fragment>
        );
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
    <div className="Coolendar-App">
      <Logo token={token} />
      <div className="content">
        {themeLoaded && <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          {editingNote ? (
            <form className="form" onSubmit={handleUpdateNote}>
              <div className="title"> Edit Note Task</div>
              <div>
                New Name:{" "}
                <input type="text"
                  name="note_name"
                  placeholder="Enter note name!"
                  value={note.note_name}
                  onChange={handleNoteChange} />
              </div>
              <div>
                New Content:{" "}
                <textarea
                  name="note_content"
                  value={note.note_content}
                  onChange={handleNoteChange}
                />

              </div>
              <button className="submit" type="submit">
                Edit Note
              </button>
            </form>
          ) : (
            <form className="form" onSubmit={handleNote}>
              <div className="title"> Insert Note Here</div>
              <div>
                Name:{" "}
                <input
                  type="text"
                  name="note_name"
                  placeholder="Enter note name!"
                  onChange={handleNoteChange} />
              </div>
              <div>
                Content:{" "}
                <textarea
                  name="note_content"
                  value={note.note_content}
                  onChange={handleNoteChange}
                />
                {/* <input type="text"
              name="note_content"
              value={note.note_content}
              onChange={handleNoteChange} /> */}
              </div>
              <button className="submit" type="submit">
                Add Note
              </button>
            </form>
          )}

          <div className="yourNotes">

            Your Note :)

            <div className="noteList">
              {selectedNoteContent && (
                <div>
                  <b>Selected Note Content:</b>
                  <div>{selectedNoteContent}</div>
                  <button
                    className="noteButtons"
                    style={{ marginLeft: '12px' }}
                    onClick={handleCloseNote}

                  >Close</button>
                </div>
              )}
            </div>

            <div className="noteList">
              <b>Bookmarked Notes:</b>
              {noteTable.map(x => (
                <div key={x.id}>
                  {x.pin ? (
                    <div className="noteBoxes">
                      <div> Note: {x.note_name} </div>
                      <div>
                        Created on: {new Date(x.last_edited_at).toLocaleDateString()}, {new Date(x.last_edited_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div> {x.note_content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))} </div>

                      <div> {x.pin ? "Bookmarked!" : ""} </div>

                      <button className="small-button" id={x.id} onClick={checkNote}> Check </button>
                      <button className="small-button" onClick={() => handleDeleteNote(x.id)}>Delete</button>
                      <button className="small-button" onClick={() => handleEditNote(x)}>Edit</button>
                      <button className="small-button" onClick={() => handleTogglePin(x.id, x.pin)}>
                        {x.pin ? "Remove bookmark" : "Bookmark"}
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="noteList">
              <b>All Notes:</b>
              {noteTable.map(x => (
                <div key={x.id} className="noteBoxes">
                  <div>{x.note_name !== "" ? "Note: " + x.note_name : "Unnamed note"}</div>
                  <div>
                    Created on: {new Date(x.last_edited_at).toLocaleDateString()}, {new Date(x.last_edited_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div> {x.pin ? "Bookmarked!" : ""} </div>

                  <button className="small-button" id={x.id} onClick={checkNote}> Check </button>
                  <button className="small-button" onClick={() => handleDeleteNote(x.id)}>Delete</button>
                  <button className="small-button" onClick={() => handleEditNote(x)}>Edit</button>
                  <button className="small-button" onClick={() => handleTogglePin(x.id, x.pin)}>
                    {x.pin ? "Remove bookmark" : "Bookmark"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ThemeProvider>}
      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default NotePage;

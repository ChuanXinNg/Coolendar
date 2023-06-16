// import React, { useState, useEffect } from "react";
// import { supabase } from '../../supabase';
// // import PropTypes from 'prop-types';
// // import "../css/App.css";

// function AddNote(diaryId) {

//     // const select and delete
//     const [noteTable, setNoteTable] = useState([]);
//     // const update
//     const [editingNote, setEditingNote] = useState(null);

//     // fetching data from database
//     useEffect(() => {
//         const fetchTodoTable = async () => {
//             try {
//                 // const user_id = token.user.id;
//                 const { data, error } = await supabase
//                     .from('notetable')
//                     .select()
//                     .eq('id', diaryId);

//                 if (error) {
//                     throw error;
//                 }

//                 setNoteTable(data.map(item => ({ ...item, id: item.id })));
//                 console.log(data);

//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         fetchTodoTable();
//     }, []);


//     // button handler to execute setEditingNote and setNote for update
//     function handleEditNote(n) {
//         setEditingNote(n);
//         setNote({
//             creator_id: n.creator_id,
//             note_name: n.note_name,
//             note_content: n.note_content
//         });
//     }

//     async function handleUpdateNote(e) {
//         e.preventDefault();
//         try {
//             const { data, error } = await supabase
//                 .from('notetable')
//                 .update({
//                     note_name: note.note_name,
//                     note_content: note.note_content
//                 })
//                 .eq('id', editingNote.id);

//             if (error) {
//                 throw error;
//             }

//             console.log(data);
//             location.reload();

//             setEditingNote(null);
//             setNote({
//                 creator_id: "",
//                 note_name: "",
//                 note_content: "",
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     async function handleDeleteNote(id) {
//         try {
//             const { data, error } = await supabase
//                 .from('notetable')
//                 .delete()
//                 .eq('id', id);

//             if (error) {
//                 throw error;
//             }

//             console.log(data);

//             const updatedNote = noteTable.filter(item => item.id !== id);
//             setNoteTable(updatedNote);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     async function handleTogglePin(id, pin) {
//         try {
//             const { data, error } = await supabase
//                 .from('notetable')
//                 .update({ pin: !pin })
//                 .eq('id', id);

//             if (error) {
//                 throw error;
//             }

//             console.log(data);

//             const updatedNote = noteTable.map(item => {
//                 if (item.id === id) {
//                     return { ...item, pin: !pin };
//                 }
//                 return item;
//             });

//             setNoteTable(updatedNote);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // function for checkNote
//     async function checkNote(diaryId) {

//         try {
//             const { data, error } = await supabase
//                 .from('notetable')
//                 .select()
//                 .eq('id', diaryId);

//             if (error) {
//                 throw error;
//             }

//             // if (data.length > 0) {
//             //   setNote(data[0].note_content);
//             // } else {
//             //   setNote('');
//             // }
//             setNote(data)
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // function for close Note
//     function handleCloseNote() {
//         setNote('');
//     }

//     return (
//         <div>

//             <div>
//                 {note && (
//                     <div>
//                         Selected Note Content:
//                         <div>{note.note_content}</div>
//                         <button onClick={handleCloseNote}> Close </button>
//                     </div>
//                 )}
//             </div>

//             <div className="notelist">
//                 {noteTable.map(x => (
//                     <div key={x.id}>
//                         <div> Note: {x.note_name} </div>
//                         <div>
//                             Created on: {new Date(x.last_edited_at).toLocaleDateString()}, {new Date(x.last_edited_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </div>
//                         <div> {x.note_content} </div>
//                         <div> {x.pin ? "Important!" : ""} </div>

//                         <button onClick={() => handleDeleteNote(x.id)}>Delete</button>
//                         <button onClick={() => handleEditNote(x)}>Edit</button>
//                         <button onClick={() => handleTogglePin(x.id, x.pin)}>
//                             {x.pin ? "Set as unimportant!" : "Set as important"}
//                         </button>
//                         <div>
//                             <button onClick={() => handleCloseNote}>Close Note</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>


//         </div>
//     );
// }

// export default AddNote;


// import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// import { supabase } from '../../supabase';
// import PropTypes from 'prop-types';
// import Navbar from "./Navbar";
// import Logo from "./Logo";

// function NotePage({ token }) {

//     // navigation purposes
//     // let navigate = useNavigate();

//     // i have no idea what this is
//     NotePage.propTypes = {
//         token: PropTypes.shape({
//             user: PropTypes.shape({
//                 id: PropTypes.string.isRequired
//             }).isRequired
//         }).isRequired
//     };

//     // const select and delete
//     const [noteTable, setNoteTable] = useState([]);

//     // const insert
//     const [note, setNote] = useState({
//         creator_id: "",
//         note_name: "",
//         note_content: ""
//     });

//     // fetching data from database
//     useEffect(() => {
//         const fetchNoteTable = async () => {
//             try {
//                 const user_id = token.user.id;
//                 const { data, error } = await supabase
//                     .from('notetable')
//                     .select()
//                     .eq('creator_id', user_id);

//                 if (error) {
//                     throw error;
//                 }

//                 setNoteTable(data.map(item => ({ ...item, id: item.id })));
//                 console.log(data);

//             } catch (err) {
//                 console.log(err);
//             }
//         }
//         fetchNoteTable();
//     }, [])

//     // button handler to setNote for insert
//     function handleNoteChange(event) {
//         const { name, value } = event.target;
//         setNote(prevFormData => ({
//             ...prevFormData,
//             creator_id: token.user.id,
//             [name]: value
//         }));
//     }

//     // function to insert data to database
//     async function handleAddNote(e) {
//         e.preventDefault();
//         console.log(note);
//         try {
//             const { data, error } = await supabase
//                 .from('notetable')
//                 .insert([
//                     {
//                         creator_id: note.creator_id,
//                         note_name: note.note_name,
//                         note_content: note.note_content
//                     },
//                 ])

//             if (error) {
//                 throw error;
//             }
//             console.log(data);

//             // automatic refresh the page
//             location.reload();

//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // function for checkNote
//     async function checkNote(event) {
//         const idToCheck = event.target.id;
//         console.log(event);

//         try {
//             const user_id = token.user.id;
//             const { data, error } = await supabase
//                 .from('notetable')
//                 .select()
//                 .eq('creator_id', user_id)
//                 .eq('note_name', idToCheck);

//             if (error) {
//                 throw error;
//             }

//             if (data.length > 0) {
//                 setNote(data[0].note_content);
//             } else {
//                 setNote('');
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // function for close Note
//     function handleCloseNote() {
//         setNote('');
//     }


//     return (
//         <div>
//             <div> <Logo /> </div>

//             <div>Add your events herre!</div>

//             <form className="form" onSubmit={handleAddNote}>
//                 <div className="title"> Add notes form</div>
//                 <div>
//                     Note: <input type='text' name="event_info" placeholder="Add notes here!" onChange={handleNoteChange} />
//                 </div>
//                 <div>
//                     Name: <input type='text' name="event_info" placeholder="Name" onChange={handleNoteChange} />
//                 </div>
//                 <button className="submit" type='submit'>Add Notes</button>
//             </form>

//             <div>NotePage</div>

//             <div> Your Notes :)</div>

//             <div>
//                 {note && (
//                     <div>
//                         Selected Note Content:
//                         <div>{note.note_content}</div>
//                         <button onClick={handleCloseNote}> Close </button>
//                     </div>
//                 )}
//             </div>

//             <div className="notelist">
//                 {noteTable.map(x => (
//                     <div key={x.note_name}>
//                         <div> Name: {x.note_name} </div>
//                         <button
//                             style={{ marginLeft: '12px' }}
//                             onClick={checkNote}
//                             id={x.note_name}
//                         >
//                             Check `{x.note_name}`
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <React.Fragment>
//                 <Navbar />
//             </React.Fragment>
//         </div>
//     );
// }

// export default NotePage;
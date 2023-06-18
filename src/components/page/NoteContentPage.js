import React from "react";
// import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import Logo from "./Logo";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
function NoteContentPage({ idToCheck }) {

  // i have no idea what this is
  NoteContentPage.propTypes = {
    token: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  console.log("this");
  console.log(idToCheck);


  // function for checkNote
  //   async function checkNote(event) {
  //   const idToCheck = event.target.id;
  //   console.log(event);
  
  //   try {
  //     const user_id = token.user.id;
  //     const { data, error } = await supabase
  //       .from('notetable')
  //       .select()
  //       .eq('creator_id', user_id)
  //       .eq('id', idToCheck);
  
  //     if (error) {
  //       throw error;
  //     }
  
  //     if (data.length > 0) {
  //       setSelectedNoteContent(data[0].note_content);
  //     } else {
  //       setSelectedNoteContent('');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  return (
    <div>
      <Logo />

      
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default NoteContentPage;

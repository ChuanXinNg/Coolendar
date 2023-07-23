import React, { useState } from "react";
import { supabase } from '../../../supabase';
import PropTypes from 'prop-types';
import { format } from 'date-fns';


function AddDiary({ token, date }) {

    // Prop type validation
    AddDiary.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        date: PropTypes.object.isRequired
    };


    // const insert
    const [diary, setDiary] = useState({
        creator_id: "",
        diary_content: ""
    });


    // button handler to setDiary for insert
    function handleDiaryChange(event) {
        const { name, value } = event.target;
        setDiary(prevFormData => ({
            ...prevFormData,
            creator_id: token.user.id,
            [name]: value
        }));
    }

    // button handler to Add Diary
    async function handleAddDiary(e) {
        e.preventDefault();
        if (diary.diary_content == "") {
            alert("Please enter content");
        } else {
            try {
                const currentDate = format(date, 'yyyy-MM-dd');
                // Add new diary
                const { data, error } = await supabase
                    .from('diarytable')
                    .insert([
                        {
                            creator_id: diary.creator_id,
                            diary_content: diary.diary_content,
                            diary_date: currentDate
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
    }

    return (
        <div>
            <form className="form" onSubmit={handleAddDiary}>
                <div className="title"> Add New Diary </div>
                <div className="AddDiary">
                    *New Diary: <textarea
                        name="diary_content"
                        value={diary.diary_content}
                        onChange={handleDiaryChange}
                        placeholder="Magnifiient day here!" />
                </div>
                <div style={{fontSize:"10px"}}>Areas marked with * are required to fill in</div>
                <button className="submit" type="submit">
                    Add Diary
                </button>
            </form>
        </div>
    );
}

export default AddDiary;
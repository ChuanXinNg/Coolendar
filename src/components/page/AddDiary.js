import React, { useState } from "react";
import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";

function AddDiary({ token }) {

    // navigation purposes
    let navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    // i have no idea what this is
    AddDiary.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
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
        try {
            // Add new task
            const { data, error } = await supabase
                .from('diarytable')
                .insert([
                    {
                        creator_id: diary.creator_id,
                        diary_content: diary.diary_content
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
        <div>
            <div> <Logo /> </div>
            <div>
                <form className="form" onSubmit={handleAddDiary}>
                    <div className="title"> Add New Diary </div>
                    <div className="AddDiary">
                        New Diary: <input type="text"
                            name="diary_content"
                            value={diary.diary_content}
                            onChange={handleDiaryChange}
                            placeholder="Magnifiient day here!" />
                    </div>
                    <button className="submit" type="submit">
                        Add Diary
                    </button>
                </form>
            </div>

            <div>
                <button onClick={() => handleNavigation("/diary")}>
                    Back to Diary
                </button>
            </div>

            <div>
                <React.Fragment>
                    <Navbar />
                </React.Fragment>
            </div>
        </div>
    );
}

export default AddDiary;
import React, { useState, useEffect } from "react";
import { supabase } from '../../../supabase';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import AddDiary from "./AddDiary";

function CurrentDiary({ token, date }) {
    CurrentDiary.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        date: PropTypes.object.isRequired
    };

    const [diaryTable, setDiaryTable] = useState([]);
    useEffect(() => {
        const fetchDiaryTable = async () => {
            try {
                const user_id = token.user.id;
                const currentDate = format(date, 'yyyy-MM-dd');
                const { data, error } = await supabase
                    .from('diarytable')
                    .select()
                    .eq('diary_date', currentDate)
                    .eq('creator_id', user_id);

                if (error) {
                    throw error;
                }

                setDiaryTable(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDiaryTable();
    }, [date]);

    const fetchDiaryTable = async () => {
        try {
            const user_id = token.user.id;
            const currentDate = format(date, 'yyyy-MM-dd');
            const { data, error } = await supabase
                .from('diarytable')
                .select()
                .eq('diary_date', currentDate)
                .eq('creator_id', user_id);

            if (error) {
                throw error;
            }

            setDiaryTable(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const [editingDiary, setEditingDiary] = useState(null);
    const [diary, setDiary] = useState({
        creator_id: "",
        diary_content: ""
    });

    function handleEditDiary(d) {
        console.log('cincai');
        console.log(d);
        setEditingDiary(d);
        setDiary({
            creator_id: d.creator_id,
            diary_content: d.diary_content
        });
    }

    function handleDiaryChange(event) {
        const { name, value } = event.target;
        setDiary(prevFormData => ({
            ...prevFormData,
            creator_id: token.user.id,
            [name]: value
        }));
        console.log(diary);
    }

    async function handleUpdateDiary(e) {
        e.preventDefault();
        if (diary.diary_content === "") {
            alert("Please insert content");
        } else {
            try {
                const { data, error } = await supabase
                    .from('diarytable')
                    .update({
                        diary_content: diary.diary_content
                    })
                    .eq('id', editingDiary.id);
                if (error) {
                    throw error;
                }
                console.log(data);
                location.reload();
                setEditingDiary(null);
                setDiary({
                    creator_id: "",
                    diary_content: ""
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function handleDeleteDiary(diaryId) {
        try {
            const { data, error } = await supabase
                .from('diarytable')
                .delete()
                .eq('id', diaryId);

            if (error) {
                throw error;
            }

            console.log(data);
            // Refresh the diary table after deletion
            fetchDiaryTable();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="CurrentDiary">
            {diaryTable.length === 0 ? (
                <>
                    <div>You did not write a diary!</div>
                    <div>
                        <AddDiary token={token} date={date} />
                    </div>
                </>
            ) : (
                diaryTable.map(x => (
                    <div key={x.id}>
                        {/* <div> {x.diary_content} </div> */}
                        <div> {x.diary_content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))} </div>
                        <div> {x.pin ? "Favourite!" : ""} </div>
                        <button className="submit" type="submit" onClick={() => handleEditDiary(x)}>
                            Edit Diary
                        </button>
                        <button className="submit" type="button" onClick={() => handleDeleteDiary(x.id)}>
                            Delete Diary
                        </button>
                        {editingDiary ? (
                            <form className="form" onSubmit={handleUpdateDiary}>
                                <div className="title"> Edit Diary</div>
                                <div>
                                    New Content:{" "}
                                    <textarea
                                        name="diary_content"
                                        value={diary.diary_content}
                                        onChange={handleDiaryChange}
                                    />
                                </div>
                                <button className="submit" type="submit">
                                    Edit Diary
                                </button>
                            </form>
                        ) : (
                            <div style={{ display: "block" }}></div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default CurrentDiary;
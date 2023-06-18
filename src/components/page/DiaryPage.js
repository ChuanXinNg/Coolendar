import React, { useState, useEffect } from "react";
import { supabase } from '../../supabase';
import PropTypes from 'prop-types';
import Logo from "./Logo";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function DiaryPage({ token }) {

    // navigation purposes
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    // i have no idea what this is
    DiaryPage.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    // const select and delete
    const [diaryTable, setDiaryTable] = useState([]);
    // const update
    const [editingDiary, setEditingDiary] = useState(null);
    // const insert
    const [diary, setDiary] = useState({
        creator_id: "",
        diary_content: ""
    });
    const [selectedDiaryContent, setSelectedDiaryContent] = useState('');

    // fetching data from database
    useEffect(() => {
        const fetchDiaryTable = async () => {
            try {
                const user_id = token.user.id;
                const { data, error } = await supabase
                    .from('diarytable')
                    .select()
                    .eq('creator_id', user_id)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                setDiaryTable(data.map(item => ({ ...item, id: item.id })));
                console.log(data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchDiaryTable();
    }, []);

    // button handler to setDiary for insert
    function handleDiaryChange(event) {
        const { name, value } = event.target;
        setDiary(prevFormData => ({
            ...prevFormData,
            creator_id: token.user.id,
            [name]: value
        }));
    }

    // button handler to Add Diary or Edit Diary
    async function handleDiary(e) {
        e.preventDefault();
        try {
            if (editingDiary) {
                // Update existing task
                await handleUpdateDiary(e);
            } else {
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
            }
        } catch (err) {
            console.log(err);
        }
    }

    // button handler to execute setEditingDiary and setDiary for update
    function handleEditDiary(d) {
        setEditingDiary(d);
        setDiary({
            creator_id: d.creator_id,
            diary_content: d.diary
        });
    }

    async function handleUpdateDiary(e) {
        e.preventDefault();
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
                diary_content: "",
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteDiary(id) {
        try {
            const { data, error } = await supabase
                .from('diarytable')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }

            console.log(data);

            const updatedDiary = diaryTable.filter(item => item.id !== id);
            setDiaryTable(updatedDiary);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleTogglePin(id, pin) {
        try {
            const { data, error } = await supabase
                .from('diarytable')
                .update({ pin: !pin })
                .eq('id', id);

            if (error) {
                throw error;
            }

            console.log(data);

            const updatedDiary = diaryTable.map(item => {
                if (item.id === id) {
                    return { ...item, pin: !pin };
                }
                return item;
            });

            setDiaryTable(updatedDiary);
        } catch (err) {
            console.log(err);
        }
    }

    // function for checkDiary
    async function checkDiary(event) {
        const idToCheck = event.target.id;
        console.log(event);

        try {
            const user_id = token.user.id;
            const { data, error } = await supabase
                .from('diarytable')
                .select()
                .eq('creator_id', user_id)
                .eq('id', idToCheck);

            if (error) {
                throw error;
            }

            if (data.length > 0) {
                const { diary_date, diary_time, diary_content } = data[0];
                const formattedTime = formatTime(diary_time);

                setSelectedDiaryContent(
                    <React.Fragment>
                        <div>Created on: {diary_date}, {formattedTime} </div>
                        <div>{diary_content}</div>
                    </React.Fragment>
                );
            } else {
                setSelectedDiaryContent('');
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleCloseDiary() {
        setSelectedDiaryContent('');
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
        <div>
            <Logo />

            <div id="addDiaryButton">
                <button onClick={() => handleNavigation("/addDiary")}>
                    Add Diary
                </button>
            </div>

            {editingDiary ? (
                <form className="form" onSubmit={handleUpdateDiary}>
                    <div className="title"> Edit Diary</div>
                    <div>
                        New Content:{" "}
                        <input type="text"
                            name="diary_content"
                            value={diary.diary_content}
                            onChange={handleDiaryChange} />
                    </div>
                    <button className="submit" type="submit">
                        Edit Diary
                    </button>
                </form>
            ) : (
                <form className="form" onSubmit={handleDiary}>
                    <div className="title"> Write your day</div>
                    <div>
                        Content:{" "}
                        <input type="text"
                            name="diary_content"
                            value={diary.diary_content}
                            onChange={handleDiaryChange} />
                    </div>
                    <button className="submit" type="submit">
                        Add Diary
                    </button>
                </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }} >

                Your Diary List :)

                <div>
                    {selectedDiaryContent && (
                        <div>
                            <b>Selected Diary:</b>
                            <div>{selectedDiaryContent}</div>
                            <button
                                style={{ marginLeft: '12px' }}
                                onClick={handleCloseDiary}
                            >Close</button>
                        </div>
                    )}
                </div>

                <div className="favouriteDiaryList">
                    <b>Favourite Diaries:</b>
                    {diaryTable.map(x => (
                        <div key={x.id}>
                            {x.pin ? (
                                <React.Fragment>
                                    <div>
                                        Created on: {x.diary_date}, {formatTime(x.diary_time)}
                                    </div>
                                    <div> {x.diary_content} </div>
                                    <div> {x.pin ? "Favourite!" : ""} </div>

                                    <button id={x.id} onClick={checkDiary}> Check </button>
                                    <button onClick={() => handleDeleteDiary(x.id)}>Delete</button>
                                    <button onClick={() => handleEditDiary(x)}>Edit</button>
                                    <button onClick={() => handleTogglePin(x.id, x.pin)}>
                                        {x.pin ? "Remove from favourite" : "Set as favourite!"}
                                    </button>
                                </React.Fragment>
                            ) : null}
                        </div>
                    ))}
                </div>

                <div className="diarylist">
                    <b>All Diaries:</b>
                    {diaryTable.map(x => (
                        <div key={x.id}>
                            <div>
                                Created on: {x.diary_date}, {formatTime(x.diary_time)}
                            </div>
                            <div> {x.diary_content} </div>
                            <div> {x.pin ? "Favourite!" : ""} </div>

                            <button id={x.id} onClick={checkDiary}> Check </button>
                            <button onClick={() => handleDeleteDiary(x.id)}>Delete</button>
                            <button onClick={() => handleEditDiary(x)}>Edit</button>
                            <button onClick={() => handleTogglePin(x.id, x.pin)}>
                                {x.pin ? "Remove from favourite" : "Set as favourite!"}
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

export default DiaryPage;
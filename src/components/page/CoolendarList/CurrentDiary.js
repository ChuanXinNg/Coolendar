import React, { useState, useEffect } from "react";
import { supabase } from '../../../supabase';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function CurrentDiary({ token, date }) {

    // navigation purposes
    // let navigate = useNavigate();

    CurrentDiary.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    // read data from database
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
        }
        fetchDiaryTable();
    }, [date])


    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        let formattedHours = parseInt(hours, 10) + 8;
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
        <div className="CurrentDiary">
            {diaryTable.length === 0 ? (
                <div>You did not write a diary!</div>
            ) : (
                diaryTable.map(x => (
                    <div key={x.id}>
                        <div> Created at: {formatTime(x.diary_time)} </div>
                        <div> Diary: {x.diary_content} </div>
                        <div> {x.pin ? "Favourite!" : ""} </div>
                    </div>
                ))
            )}
        </div>
    );

}

export default CurrentDiary;
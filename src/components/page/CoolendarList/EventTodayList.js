import React, { useState, useEffect } from "react";
import { supabase } from '../../../supabase';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

function EventTodayList({ token }) {

    // navigation purposes
    // let navigate = useNavigate();

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
                const currentDate = format(new Date(), 'yyyy-MM-dd');
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
    }, [])


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
            {eventTable.length === 0 ? (
                <div>There is no event today!</div>
            ) : (
                eventTable.map(x => (
                    <div key={x.id}>
                        <div> Task: {x.event_info} </div>
                        <div> Due Date: {x.event_date} </div>
                        <div> Due Time: {formatTime(x.event_time)} </div>
                    </div>
                ))
            )}
        </div>
    );

}

export default EventTodayList;
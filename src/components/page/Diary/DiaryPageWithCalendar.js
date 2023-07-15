import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import Logo from "../Logo";
import Navbar from "../Navbar";
import CurrentDiary from "./CurrentDiary";
import { format } from 'date-fns';
import "../../css/App.css";

function DiaryPageWithCalendar({ token }) {

    // to ensure token is valid
    DiaryPageWithCalendar.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        console.log("Date changed:", date);
    }, [date]);

    return (
        <div className="Coolendar-App">
            <Logo token={token} />

            <div className="content">
                <div className="calendar-container">
                    <Calendar
                        className="calendar"
                        onChange={setDate}
                        value={date}
                    />
                </div>
                {date.length > 0 ? (
                    <p>
                        <span>Start:</span>{' '} {date[0].toDateString()}
                        &nbsp; to &nbsp;
                        <span>End:</span> {date[1].toDateString()}
                    </p>
                ) : (
                    <p>
                        <span>Selected date:</span>{' '} {date.toDateString()}
                    </p>
                )}

                <div className="currentList">
                    <div className="listTitle">
                        <div> <strong> Diary of {format(date, 'yyyy-MM-dd')} </strong> </div>
                        <CurrentDiary token={token} date={date} />
                    </div>
                </div>
            </div>

            <React.Fragment>
                <Navbar />
            </React.Fragment>
        </div >

    );

}

export default DiaryPageWithCalendar;
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import Logo from "../Logo";
import Navbar from "../Navbar";
import CurrentDiary from "./CurrentDiary";
import { format } from 'date-fns';
import "../../css/diaryPage.css";
import { GlobalStyles } from '../../../theme/GlobalStyles';
import { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { useTheme } from '../../../theme/useTheme';

function DiaryPageWithCalendar({ token }) {

    // to ensure token is valid
    DiaryPageWithCalendar.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    const {theme, themeLoaded, getFonts} = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    
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

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        console.log("Date changed:", date);
    }, [date]);

    return (
        <div className="Coolendar-App">
            <Logo token={token} />

            <div className="content">
            {themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
                    <Calendar
                        className="calendar smaller"
                        onChange={setDate}
                        value={date}
                    />

                <div className="currentList">
                    <div className="listTitle">
                        <div> <strong> Diary of {format(date, 'yyyy-MM-dd')} </strong> </div>
                        <CurrentDiary token={token} date={date} />
                    </div>
                </div>
                </ThemeProvider>}
            </div>

            <React.Fragment>
                <Navbar />
            </React.Fragment>
        </div >

    );

}

export default DiaryPageWithCalendar;
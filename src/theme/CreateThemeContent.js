/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { generate } from 'shortid';
import _ from 'lodash';
import { useTheme } from '../theme/useTheme';
import { getFromLS, setToLS } from '../utils/storage';

const Container = styled.div`

    margin-top: 3rem;
    margin-bottom: 15rem;
`;

const Section = styled.div`
    vertical-align: top;
    margin-right: 10px;
    padding: 10px;
`;

const Row = styled.div`
    padding: 5px;
`;

const Preview = styled.div`
    border: 1px solid #000000;
    border-radius: 4px;
    width: 100%;
    height: 300px;
    padding: 5px;
`;

const CreateThemeContent = props => {

    const defaultTheme = {
        themeName: "",
        bgColor: "#FFFFFF",
        txtColor: "#000000",
        btnBgColor: "#ADD8E6",
        btnTxtColor: "#000000",
        btnBdrColor: "#008CFF",
        taskBoxes: "#FFD66C",
        noteBoxes: "#D9A5FF",
        bookmarked: "#F8FFA5",
        titleBar: "#FF59FF",
        day: "#FFE6FD",
        highlight: "#7EEAD6",
        calTxt: "#000000",
        navColor: "#00FFFF",
        font: "Roboto"
    };
    const { getFonts } = useTheme();
    const [state, setState] = useState(defaultTheme);
    
    const [newTheme, setNewTheme] = useState({});

    const getThemeObj = () => {
        const themeObj = {};
        themeObj[_.camelCase(state.themeName)] = {
            "id": generate(),
            "name": state.themeName,
            "colors": {
            "body": state.bgColor,
            "text": state.txtColor,
            "button": {
                "text": state.btnBgColor,
                "background": state.btnTxtColor,
                "border": state.btnBdrColor
            },
            "taskBoxes": state.taskBoxes,
            "noteBoxes": state.noteBoxes,
            "bookmarked": state.bookmarked,
            "calendar": {
                "title": state.titleBar,
                "day": state.day,
                "highlight": state.highlight,
                "text": state.calTxt
            },
            "navbar": {
                "color": state.navColor,
            }
                },
            "font": "Roboto"
        };
        return themeObj;
    }

    useEffect(() => {
        const updated = getThemeObj();
        setNewTheme({...updated});
    }, [state]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };    

    useEffect(() => {
        console.log(state);
    }, [state]);    

    const createTheme = () => {
        const existingData = getFromLS('all-themes'); // Step 1: Load existing data from local storage
      
        console.log(existingData);
      
        const newData = {
          ...existingData.data, // Spread the existing data under the "data" property
          ...newTheme
        };
      
        const newThemeData = {
          data: newData // Wrap the new data with the "data" property
        };
      
        // Save the updated theme data to local storage
        setToLS('all-themes', newThemeData); // Save only the "data" part of the object
      
        console.log(newThemeData);
      
        setState({...defaultTheme});
        props.create(newTheme);
      };

    return(
    <>
        <button 
            style={{float:'right'}} 
            onClick={ createTheme }
            disabled={ state.themeName.trim().length === 0 }>
            Happy? Let&apos;s Create
        </button>
        <Container>
            <Section>
                <Row>
                    <label htmlFor="th_name">Theme Name:</label> {' '}
                    <input 
                        type="text" 
                        id="themeName" 
                        name="themeName" 
                        value={ state.themeName }
                        placeholder="Specify a name" 
                        onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="bg_color">Background Color:</label> {' '}
                    <input type="color" id="bg_color" name="bgColor" value= { state.bgColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="txt_color">Text Color:</label> {' '}
                    <input type="color" id="txt_color" name="txtColor" value={ state.txtColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="btn_bg_color">Button Text Color:</label> {' '}
                    <input type="color" id="btn_bg_color" name="btnBgColor" value={ state.btnBgColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="btn_txt_color">Button Background Color:</label> {' '}
                    <input type="color" id="btn_txt_color" name="btnTxtColor" value={ state.btnTxtColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="btn_bdr_color">Button Border Color:</label> {' '}
                    <input type="color" id="btn_bdr_color" name="btnBdrColor" value={ state.btnBdrColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="font">Select a Font:</label> {' '}
                    <select name="font" id="font" onChange={ handleChange } value={state.font}>
                        {getFonts().map((font, index) =>
                            <option value={ font } key={ index }>{ font }</option>
                        )}
                    </select>
                </Row>

                    <Row>
                        <label htmlFor="bg_todo_color">Todo Color:</label> {' '}
                        <input
                            type="color"
                            id="bg_todo_color"
                            name="taskBoxes"
                            value={state.taskBoxes}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <label htmlFor="note_box_color">Note Boxes Color:</label> {' '}
                        <input
                            type="color"
                            id="note_box_color"
                            name="noteBoxes"
                            value={state.noteBoxes}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <label htmlFor="note_box_out_color">Note Boxes Outer Color:</label> {' '}
                        <input
                            type="color"
                            id="note_box_out_color"
                            name="bookmarked"
                            value={state.bookmarked}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <label htmlFor="cal_bar_color">Calendar Bar Color:</label> {' '}
                        <input
                            type="color"
                            id="cal_bar_color"
                            name="titleBar"
                            value={state.titleBar}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <label htmlFor="cal_tiles_color">Calendar Tiles Color:</label> {' '}
                        <input
                            type="color"
                            id="cal_tiles_color"
                            name="day"
                            value={state.day}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <label htmlFor="highlight_color">Highlight Color:</label> {' '}
                        <input
                            type="color"
                            id="highlight_color"
                            name="highlight"
                            value={state.highlight}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <label htmlFor="cal_txt_color">Calendar Text Color:</label> {' '}
                        <input
                            type="color"
                            id="cal_txt_color"
                            name="calTxt"
                            value={state.calTxt}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <label htmlFor="nav_color">Navigation Bar Color:</label> {' '}
                        <input
                            type="color"
                            id="nav_color"
                            name="navColor"
                            value={state.navColor}
                            onChange={handleChange}
                        />
                    </Row>
            </Section>

            <Section>
                <span><b>Preview</b></span>
                <Preview style={{backgroundColor: state.bgColor, color: state.txtColor, fontFamily: state.font}}>
                    <p>
                        This is for preview only. Pick the color and font from the 
                        left side to see it working.
                    </p>
                    <button className="btn" style={{
                        backgroundColor:state.btnTxtColor, 
                        color:state.btnBgColor, 
                        fontFamily: state.font, 
                        border: "solid",
                        borderColor: state.btnBdrColor}}>
                        I am a Button
                    </button> {'  '}
                    <div style={{backgroundColor: state.taskBoxes, padding: "10px", margin: "10px", border: "solid", borderRadius: "5px", borderWidth:"1px", textAlign:"center"}}>
                        Todo
                    </div>
                    <div style={{backgroundColor: state.bookmarked, margin: "10px", border: "solid", borderRadius: "5px", borderWidth:"1px", textAlign:"center"}}>
                        Outer
                        <div style={{backgroundColor: state.noteBoxes, padding: "10px", margin: "10px", border: "solid", borderRadius: "5px", borderWidth:"1px"}}>
                        Notes
                        </div>
                    </div>
                </Preview>
            </Section>
        </Container>
    </>
    )
};

export default CreateThemeContent;
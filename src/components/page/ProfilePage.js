import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import PropTypes from "prop-types";
import { supabase } from '../../supabase';
import Profile from "./CoolendarList/Profile";
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from '../../theme/GlobalStyles';
import {useTheme} from '../../theme/useTheme';

import ThemeSelector from '../../theme/themeSelector';

import Dialog from '../../theme/Dialog';
import CreateThemeContent from '../../theme/CreateThemeContent';

const Container = styled.div`
  margin: 5px auto 5px auto;
`;


function ProfilePage({ token }) {
    const { user } = token;

    ProfilePage.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                user_metadata: PropTypes.shape({
                    name: PropTypes.string.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    };

    // fetching data from profiletable
    const [profileTable, setProfileTable] = useState([]);
    
    useEffect(() => {
        const fetchProfileTable = async () => {
            try {
                const user_id = user.id;
                const { data, error } = await supabase
                    .from('profiletable')
                    .select()
                    .eq('user_id', user_id);

                if (error) {
                    throw error;
                }

                setProfileTable(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProfileTable();
    }, [user]);

    const {theme, themeLoaded, getFonts} = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const [showDialog, setShowDialog] = useState(false);
    const [newTheme, setNewTheme] = useState();
    
   useEffect(() => {
      WebFont.load({
        google: {
          families: getFonts()
        }
      });
    });
  
    useEffect(() => {
      setSelectedTheme(theme);
    }, [themeLoaded]);
  
    const manageDialog = () => {
      setShowDialog(!showDialog);
    }
  
    const createTheme = newTheme => {
      console.log(newTheme);
      setShowDialog(false);
      setNewTheme(newTheme);
    }


    return (
        <div className="Coolendar-App">
            <Logo token={token}/>
            <div className="content">

            <Profile token={token} />


            {profileTable.map((x) => (
                <div key={x.id}>
                    <div>
                        This is the end of your profile page.
                        {/* <div> Your username is: {user.user_metadata.name} </div>
                        <div> Your username is: {x.username} </div> */}
                        {/* <div> Your birthday is: {x.birthday} </div> */}
                    </div>
                    {/* <button className="submit" type="button" onClick={() => handleDeleteProfile(x.id)}>
                        Remove Whole Profile
                    </button> */}
                </div>
            ))}

            </div>

            {
            themeLoaded && <ThemeProvider theme={ selectedTheme }>
                <GlobalStyles/>
                <Container style={{fontFamily: selectedTheme.font}}>
                <h1>Theming System</h1>
                <button className="btn" onClick={ manageDialog }>Create a Theme</button>
                <Dialog 
                    header="Create a Theme"
                    body={ <CreateThemeContent create={ createTheme }/> }
                    open={ showDialog } 
                    callback = { manageDialog }/>
                <ThemeSelector setter={ setSelectedTheme } newTheme={ newTheme }/>
                </Container>
            </ThemeProvider>
            }

            <div>
                <React.Fragment>
                    <Navbar />
                </React.Fragment>
            </div>
        </div>
    );
}

export default ProfilePage;

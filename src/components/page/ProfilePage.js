import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import PropTypes from "prop-types";
import Profile from "./CoolendarList/Profile";
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from '../../theme/GlobalStyles';
import {useTheme} from '../../theme/useTheme';
import { useNavigate } from "react-router-dom";
import ThemeSelector from '../../theme/themeSelector';
import Dialog from '../../theme/Dialog';
import CreateThemeContent from '../../theme/CreateThemeContent';
import "../css/ProfilePage.css";

const Container = styled.div`
  margin: 5px auto 5px auto;
`;


function ProfilePage({ token }) {

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

    
    let navigate = useNavigate();

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

    function handleLogOut() {
        sessionStorage.removeItem('token');
        navigate('/');
    
      }

    return (
        <div className="Coolendar-App">
            <Logo token={token}/>
            <div className="content">

            <Profile token={token} />

            </div>

            

            <div className="theme">
            {
            themeLoaded && <ThemeProvider theme={ selectedTheme }>
                <GlobalStyles/>
                <Container style={{fontFamily: selectedTheme.font}}>
                <ThemeSelector setter={ setSelectedTheme } newTheme={ newTheme }/>
                <button className="btn" onClick={ manageDialog }>Create a Theme</button>
                <Dialog 
                    header="Create a Theme"
                    body={ <CreateThemeContent create={ createTheme }/> }
                    open={ showDialog } 
                    callback = { manageDialog }/>
                </Container>
            </ThemeProvider>
            }
            </div>

            <div className="end">
                This is the end of your profile page.
                <div>
                    <button className="submit" onClick={handleLogOut}>Log out</button>
                </div>
            </div>

            <div>
                <React.Fragment>
                    <Navbar />
                </React.Fragment>
            </div>
        </div>
    );
}

export default ProfilePage;

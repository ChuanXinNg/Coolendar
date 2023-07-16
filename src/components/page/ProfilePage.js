import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";

// eslint-disable-next-line react/prop-types
function ProfilePage({token}) {

    return (
        <div className="Coolendar-App">
            <Logo token={token}/>
            <div className="content">
                This is my ProfilePage
            </div>
            <React.Fragment>
                <Navbar />
            </React.Fragment>
        </div>
    );
}

export default ProfilePage;
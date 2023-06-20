import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";

function ProfilePage() {

    return (
        <div>
            <Logo />
            This is my ProfilePage
            <React.Fragment>
                <Navbar />
            </React.Fragment>
        </div>
    );
}

export default ProfilePage;
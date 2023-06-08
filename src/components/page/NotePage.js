import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";

function NotePage() {
  return (
    <div>
      <Logo/>
      NotePage
      <React.Fragment>
        <Navbar/>
      </React.Fragment>
    </div>
  );
}

export default NotePage;
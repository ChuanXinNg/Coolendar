import React from "react";
import Logo from "./Logo";
import "../css/NewEvent.css";

function NewEventPage() {

  return (
    <div className="NewEventPage">
      <Logo/>
      
      New Event

      <form>
        <input className="details" type="text" placeholder="Enter Event Title"/>
        
        <input className="details" type="text" placeholder="Enter Details"/>

        <div className="horizontal-scroll">
          <div className="RangeForm">
            One Day Event
            <div>Date: <input type="date"/></div>
            <div>Time: <input type="time"/></div>
          </div>

          <div className="RangeForm">
            Multiple Days Event
            <div>Date: <input type="date"/></div>
            <div>Time: <input type="time"/></div>
          </div>

          <div className="RangeForm">
            Birthday/Festival
            <div>Date: <input type="date"/></div>
          </div>

        </div>
        
        <div style={{display: "flex", flexDirection: "row"}}>
          <input type="checkbox"/> Notifications
        </div>
        
        <div style={{display: "flex", flexDirection: "row"}}>
          <input type="checkbox"/> Alarms &emsp;
          <input type="time"/>
        </div>
        
        <div style={{display: "flex", flexDirection: "row"}}>
          Color: &emsp; <input type="color"/>
        </div>

      </form>
    </div>
  );
}

export default NewEventPage;
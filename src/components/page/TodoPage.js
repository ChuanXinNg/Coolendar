import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import "../css/TodoPage.css";

function TodoPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
      <Logo />
      Todo
      <div>
        <div className="insert-todo">
          <input id="todo-title" type="text" placeholder="Enter Your Task Here!" />
          <div>
            <div> Due Date: <input id="date-picker" type="date" style={{ margin: "5px 5px" }} /> </div>
            <div> Time (Optional): <input id="date-picker" type="time" style={{ margin: "5px 5px" }} /> </div>
          </div>

          <button>Add Todo Task</button>
        </div>


        <div id="todo-list"></div>


      </div>

      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default TodoPage;
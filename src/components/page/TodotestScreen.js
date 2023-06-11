import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../supabase';
// import axios from "axios";
import coolendarLogo from "../images/Coolendar logo light cropped.png";
import Navbar from "./Navbar";
import Logo from "./Logo";
import "../css/App.css";


function todotestScreen({ token }) {

  // navigation purposes
  let navigate = useNavigate();

  // read data from database
  const [todo, setTodoTable] = useState([]);
  useEffect(() => {
    const fetchTodoTable = async () => {
      try {

        const user_id = token.user.id;
        const { data, error } = await supabase
          .from('todotable')
          .select()
          .eq('creator_id', user_id);

        if (error) {
          throw error;
        }

        setTodoTable(data);
        console.log(data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchTodoTable();
  }, [])

  // const to insert todoTask
  const [todoTask, setTodoTask] = useState({
    creator_id: "",
    todo_task: "",
    todo_deadline_date: "",
    todo_deadline_time: ""
  });

  // function to handle changes to input
  function handleTodoChange(event) {
    const { name, value } = event.target;
    setTodoTask(prevFormData => ({
      ...prevFormData,
      creator_id: token.user.id,
      [name]: value
    }));
  }

  // function to insert data to database
  async function handleAddTodoTask(e) {
    e.preventDefault();
    try {

      const { data, error } = await supabase
        .from('todotable')
        .insert([
          {
            creator_id: todoTask.creator_id,
            todo_task: todoTask.todo_task,
            deadline_date: todoTask.todo_deadline_date,
            deadline_time: (todoTask.todo_deadline_time == null ? null : todoTask.todo_deadline_time)
          },
        ])

      if (error) {
        throw error;
      }

      console.log(data);

      // automatic refresh the page
      location.reload();

    } catch (err) {
      console.log(err);
    }
  }

  console.log(token);

  function toUserScreen() {
    navigate('/user');
  }

  return (
    <div className="Coolendar-App">
      <div className="header">
        <img className="App-logo" src={coolendarLogo} alt="logo" onClick={toUserScreen} />
        Heylo, {token.user.user_metadata.name}, {token.user.id}
      </div>

      <form className="form" onSubmit={handleAddTodoTask}>
        <div className="title"> Insert Todo Here</div>
        <div>
          Task: <input type='text' name="todo_task" placeholder="Enter your task here!" onChange={handleTodoChange} />
        </div>
        <div>
          Due Date: <input type='date' name="todo_deadline_date" onChange={handleTodoChange} />
        </div>
        <div>
          Due Time: <input type='time' name="todo_deadline_time" onChange={handleTodoChange} />
        </div>
        <button className="submit" type='submit'>Add Todo Task</button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
        <Logo />
        Your Todos :)

        <div className="todolist">
          {todo.map(x => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <div> Task: {x.todo_task} </div>
              <div> Due Date: {x.deadline_date} </div>
              <div> Due Time: {x.deadline_time != null ? x.deadline_time : 'Time is not set.'} </div>
            </div>
          ))}
        </div>

        <React.Fragment>
          <Navbar />
        </React.Fragment>
      </div>

    </div>
  );

}

export default todotestScreen;
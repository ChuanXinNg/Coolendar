import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../supabase';
import Calendar from 'react-calendar';
import coolendarLogo from "../images/Coolendar logo light cropped.png";
import Navbar from "./Navbar";
import "../css/App.css";


function calendarScreen({ token }) {

  // navigation purposes
  let navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  // const [todoListVisible, setTodoListVisible] = useState(false);
  const [todo, setTodo] = useState([]);

  console.log(token);

  function toUserScreen() {
    navigate('/user');
  }

  useEffect(() => {
    const fetchtodo = async () => {
      try {

        const user_id = token.user.id;
        const { data, error } = await supabase
          .from('todotable')
          .select()
          .eq('creator_id', user_id);

        if (error) {
          throw error;
        }

        setTodo(data);
        console.log(data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchtodo();
  }, [])

  function toTodoPage() {
    navigate("/todo");
  }

  return (
    <div className="Coolendar-App">
      <div className="header">
        <img className="App-logo" src={coolendarLogo} alt="logo" onClick={toUserScreen} />
        Welcome back, {token.user.user_metadata.name}, {token.user.id}
      </div>

      <div>
        <div className="calendar-container">
          <Calendar
            className="calendar"
            onChange={setDate}
            value={date}
          // selectRange={true} 
          // onClickDay={() => setTodoListVisible(true)}
          />
        </div>
        {date.length > 0 ? (
          <p>
            <span>Start:</span>{' '} {date[0].toDateString()}
            &nbsp; to &nbsp;
            <span>End:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p>
            <span>Selected date:</span>{' '} {date.toDateString()}
          </p>
        )}

        <div className="todotry">
          {todo.map(t => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <div> Task: {t.todo_task} </div>
              <div> Deadline: {t.deadline_date} </div>
              <div> Finish by: {t.deadline_time != null ? t.deadline_time : 'Time is not set.'} </div>
            </div>
          ))}
        </div>

        {/* <Todo todoListVisible={todoListVisible} /> */}

        <button onClick={toTodoPage}>Add new Todo Task</button>

      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div >

  );

}

export default calendarScreen;

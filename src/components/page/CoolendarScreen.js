import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import "../css/App.css";
import { supabase } from '../../supabase';
import Navbar from "./Navbar";
import Logo from "./Logo";


function calendarScreen({ token }) {

  let navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  // const [todoListVisible, setTodoListVisible] = useState(false);
  const [todo, setTodo] = useState([]);

  console.log(token);

  useEffect(() => {
    const fetchtodo = async () => {
      try {
        const { data, error } = await supabase
        .from('todo')
        .select('*')

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

  function totestpage() {
    navigate("/todotest");
  }

  return (
    <div className="Coolendar-App">
      <Logo/>
      Welcome back, {token.user.user_metadata.name}
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
              {t.user_id}, {t.todo_task}, {t.todo_date}
            </div>
          ))}
        </div>

        {/* <Todo todoListVisible={todoListVisible} /> */}

        <button onClick={totestpage}>try insert todo</button>

        <React.Fragment>
          <Navbar />
        </React.Fragment>

      </div>
    </div>
  );

}

export default calendarScreen;

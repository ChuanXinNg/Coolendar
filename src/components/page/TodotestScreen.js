import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../supabase';
import coolendarLogo from "../images/Coolendar logo light cropped.png";
import Navbar from "./Navbar";
import Logo from "./Logo";
import "../css/App.css";

function todotestScreen({ token }) {

  // for navigation purposes
  let navigate = useNavigate();

  // const select and delete
  const [todoTable, setTodoTable] = useState([]);
  // const update
  const [editingTask, setEditingTask] = useState(null);
  // const insert
  const [todoTask, setTodoTask] = useState({
    creator_id: "",
    todo_task: "",
    todo_deadline_date: "",
    todo_deadline_time: ""
  });

  // fetching data from database
  useEffect(() => {
    const fetchTodoTable = async () => {
      try {
        const user_id = token.user.id;
        const { data, error } = await supabase
          .from('todotable')
          .select()
          .order('deadline_date', { ascending: true })
          .order('deadline_time', { ascending: true })
          .order('id', { ascending: false })
          .eq('creator_id', user_id);
        if (error) {
          throw error;
        }
        setTodoTable(data.map(item => ({ ...item, id: item.id })));
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodoTable();
  }, []);

  // button handler to setTodoTask for insert
  function handleTodoChange(event) {
    const { name, value } = event.target;
    setTodoTask(prevFormData => ({
      ...prevFormData,
      creator_id: token.user.id,
      [name]: value
    }));
  }

  // button handler to Add Todo Task or Edit Todo Task
  async function handleTodoTask(e) {
    e.preventDefault();
    try {
      if (editingTask) {
        // Update existing task
        await handleUpdateTodoTask(e);
      } else {
        // Add new task
        const { data, error } = await supabase
          .from('todotable')
          .insert([
            {
              creator_id: todoTask.creator_id,
              todo_task: todoTask.todo_task,
              deadline_date: todoTask.todo_deadline_date,
              deadline_time: todoTask.todo_deadline_time
            },
          ]);
        if (error) {
          throw error;
        }
        console.log(data);
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  // button handler to execute setEditingTask and setTodoTask for update
  function handleEditTodoTask(task) {
    setEditingTask(task);
    setTodoTask({
      creator_id: task.creator_id,
      todo_task: task.todo_task,
      todo_deadline_date: task.deadline_date,
      todo_deadline_time: task.deadline_time
    });
  }

  async function handleUpdateTodoTask(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('todotable')
        .update({
          todo_task: todoTask.todo_task,
          deadline_date: todoTask.todo_deadline_date,
          deadline_time: todoTask.todo_deadline_time
        })
        .eq('id', editingTask.id);

      if (error) {
        throw error;
      }

      console.log(data);
      location.reload();

      setEditingTask(null);
      setTodoTask({
        creator_id: "",
        todo_task: "",
        todo_deadline_date: "",
        todo_deadline_time: ""
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteTodoTask(id) {
    try {
      const { data, error } = await supabase
        .from('todotable')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      console.log(data);

      const updatedTodo = todoTable.filter(item => item.id !== id);
      setTodoTable(updatedTodo);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleToggleTodoDone(id, done) {
    try {
      const { data, error } = await supabase
        .from('todotable')
        .update({ done: !done })
        .eq('id', id);

      if (error) {
        throw error;
      }

      console.log(data);

      const updatedTodo = todoTable.map(item => {
        if (item.id === id) {
          return { ...item, done: !done };
        }
        return item;
      });

      setTodoTable(updatedTodo);
    } catch (err) {
      console.log(err);
    }
  }

  // trigger user screen (can be deleted if not using header)
  function toUserScreen() {
    navigate('/user');
  }

  return (
    <div className="Coolendar-App">
      <div className="header">
        <img
          className="App-logo"
          src={coolendarLogo}
          alt="logo"
          onClick={toUserScreen}
        />
        Heylo, {token.user.user_metadata.name}, {token.user.id}
      </div>

      {editingTask ? (
        <form className="form" onSubmit={handleUpdateTodoTask}>
          <div className="title"> Edit Todo Task</div>
          <div>
            Task:{" "}
            <input type="text"
              name="todo_task"
              placeholder="Enter your task here!"
              value={todoTask.todo_task}
              onChange={handleTodoChange} />
          </div>
          <div>
            Due Date:{" "}
            <input type="date"
              name="todo_deadline_date"
              value={todoTask.todo_deadline_date}
              onChange={handleTodoChange} />
          </div>
          <div>
            Due Time:{" "}
            <input type="time"
              name="todo_deadline_time"
              value={todoTask.todo_deadline_time}
              onChange={handleTodoChange} />
          </div>
          <button className="submit" type="submit">
            Update Todo Task
          </button>
        </form>
      ) : (
        <form className="form" onSubmit={handleTodoTask}>
          <div className="title"> Insert Todo Here</div>
          <div>
            Task:{" "}
            <input
              type="text"
              name="todo_task"
              placeholder="Enter your task here!"
              onChange={handleTodoChange}
            />
          </div>
          <div>
            Due Date:{" "}
            <input
              type="date"
              name="todo_deadline_date"
              onChange={handleTodoChange}
            />
          </div>
          <div>
            Due Time:{" "}
            <input
              type="time"
              name="todo_deadline_time"
              onChange={handleTodoChange}
            />
          </div>
          <button className="submit" type="submit">
            Add Todo Task
          </button>
        </form>
      )}

      <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }} >
        <Logo />
        Your Todos :)

        <div className="todolist">
          {todoTable.map((x) => (
            <div key={x.id}>
              <div> Task: {x.todo_task} </div>
              <div> Due Date: {x.deadline_date} </div>
              <div>
                Due Time:
                {x.deadline_time != null ? x.deadline_time : "Time is not set."}
              </div>
              <div> {x.done ? "Completed!" : "You have not completed this task."} </div>
              <button onClick={() => handleDeleteTodoTask(x.id)}>Delete</button>
              <button onClick={() => handleEditTodoTask(x)}>Edit</button>
              <button onClick={() => handleToggleTodoDone(x.id, x.done)}>
                {x.done ? "Mark as Not Done" : "Mark as Done"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default todotestScreen;

import React, { useState, useEffect } from "react";
import { supabase } from '../../../supabase';
import Navbar from "../Navbar";
import Logo from "../Logo";
import '../../css/TodoPage.css';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { useTheme } from '../../../theme/useTheme';

function todoPage({ token }) {

  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
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

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  // fetching data from database
  useEffect(() => {
    const fetchTodoTable = async () => {
      try {
        const user_id = token.user.id;
        // const currentDate = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('todotable')
          .select()
          .eq('creator_id', user_id)
          .order('deadline_date', { ascending: true })
          .order('deadline_time', { ascending: true })
          .order('id', { ascending: false })


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
      } else if (todoTask.todo_deadline_time == "") {
          const { data, error } = await supabase
          .from('todotable')
          .insert([
            {
              creator_id: todoTask.creator_id,
              todo_task: todoTask.todo_task,
              deadline_date: todoTask.todo_deadline_date,
              has_dueTime: false
            },
          ]);
        if (error) {
          throw error;
        }
        console.log(data);
        location.reload();
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
      alert("Failed to insert");
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
      alert("This task will be deleted");

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

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    let formattedHours = parseInt(hours, 10);
    if (formattedHours >= 0 && formattedHours < 10) {
      // morning before 10am
      return `0${formattedHours}:${minutes}am`;
    } else if (formattedHours > 10 && formattedHours < 12) {
      // morning after 10am and before afternoon 12pm
      return `${formattedHours}:${minutes}pm`;
    } else if (formattedHours == 12) {
      // afternoon on 12pm
      return `${formattedHours}:${minutes}pm`;
    } else if (formattedHours > 12 && formattedHours < 22) {
      // afternoon after 12pm and before 10pm
      formattedHours = formattedHours - 12;
      return `0${formattedHours}:${minutes}pm`;
    } else if (formattedHours >= 22 && formattedHours < 24) {
      // afternoon after 10pm
      formattedHours = formattedHours - 12;
      return `${formattedHours}:${minutes}pm`;
    } else {
      return 'Bad Timing. Invalid Timing input.'
    }
  }

  return (
    <div className="Coolendar-App">
      <Logo token={token}/>
      <div className="content">
        {themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
      {editingTask ? (
        <form className="form" onSubmit={handleUpdateTodoTask}>
          <div className="title"> Edit Todo Task </div>
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
          <div className="title"> Add new Todo Task</div>
          <div>
            *Task:{" "}
            <input
              type="text"
              name="todo_task"
              placeholder="Enter your task here!"
              onChange={handleTodoChange}
            />
          </div>
          <div>
            *Due Date:{" "}
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
          <div style={{fontSize:"10px"}}>Areas marked with * are required to fill in</div>
          <button className="submit" type="submit">
            Add Todo Task
          </button>
        </form>
      )}

      <div className="yourTodos">
        Your Todos :)

        <div className="undoneTodolist">
          <b>Incomplete tasks</b>
          {todoTable.map(x => (
            <div key={x.id} style={{margin:"5px"}}>
              {x.done ? null : (
                <div className="taskBoxes">
                  <p className="taskTitle"> {x.todo_task} </p>
                  <div> Due Date: {new Date(x.deadline_date).toLocaleDateString()} </div>
                  <div>
                    Due Time: {x.has_dueTime ? formatTime(x.deadline_time) : 'Time is not set.'}
                  </div>
                  <p> {x.done ? 'Completed!' : 'You have not completed this task.'} </p>

                  <button className="small-button" onClick={() => handleDeleteTodoTask(x.id)}>Delete</button>
                  <button className="small-button" onClick={() => handleEditTodoTask(x)}>Edit</button>
                  <button className="small-button" onClick={() => handleToggleTodoDone(x.id, x.done)}>
                    {x.done ? "Mark as Not Done" : "Mark as Done"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="doneTodolist">
          <b>Completed tasks</b>
          {todoTable.map(x => (
            <div key={x.id} style={{margin:"5px"}}>
              {x.done ? (
                <div className="taskBoxes">
                <p className="taskTitle"> {x.todo_task} </p>
                <div> Due Date: {new Date(x.deadline_date).toLocaleDateString()} </div>
                <div>
                  Due Time: {x.has_dueTime ? formatTime(x.deadline_time) : 'Time is not set.'}
                </div>
                <p> {x.done ? 'Completed!' : 'You have not completed this task.'} </p>

                <button className="small-button" onClick={() => handleDeleteTodoTask(x.id)}>Delete</button>
                <button className="small-button" onClick={() => handleEditTodoTask(x)}>Edit</button>
                <button className="small-button" onClick={() => handleToggleTodoDone(x.id, x.done)}>
                  {x.done ? "Mark as Not Done" : "Mark as Done"}
                </button>
              </div>
              ) : null}
            </div>
          ))}
        </div>
        </div>  
        </ThemeProvider>}
        
      </div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    </div>
  );
}

export default todoPage;

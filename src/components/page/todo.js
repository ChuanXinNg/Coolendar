// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
// import "../css/App.css";

// function Todo({ todoListVisible }) {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     // Retrieve todos from localStorage
//     const savedTodos = JSON.parse(localStorage.getItem('todo_task'));

//     if (Array.isArray(savedTodos)) {
//       setTodos(savedTodos);
//     } else {
//       setTodos([]);
//     }
//   }, []);

//   function createTodo(title, dueDate) {
//     const id = '' + new Date().getTime();

//     const newTodo = {
//       title: title,
//       dueDate: dueDate,
//       id: id
//     };

//     setTodos([...todos, newTodo]);
//     saveTodos([...todos, newTodo]);
//   }

//   function removeTodo(idToDelete) {
//     const updatedTodos = todos.filter((todo) => todo.id !== idToDelete);
//     setTodos(updatedTodos);
//     saveTodos(updatedTodos);
//   }

//   function saveTodos(updatedTodos) {
//     localStorage.setItem('todo_task', JSON.stringify(updatedTodos));
//   }

//   function addTodo() {
//     const textbox = document.getElementById('todo-title');
//     const title = textbox.value;

//     const datePicker = document.getElementById('date-picker');
//     const dueDate = datePicker.value;

//     createTodo(title, dueDate);
//   }

//   function deleteTodo(event) {
//     const idToDelete = event.target.id;
//     removeTodo(idToDelete);
//   }

//   return (
//     <div>
//       {todoListVisible && (
//         <div>
//           <div className="header">
//             <input id="todo-title" type="text" />
//             <input id="date-picker" type="time" />

//             <button onClick={addTodo}>
//               Add Todo Task
//             </button>
//           </div>

//           <div id="todo-list">
//             {todos.map((todo) => (
//               <div key={todo.id}>
//                 {todo.title}, {todo.dueDate}
//                 <button
//                   style={{ marginLeft: '12px' }}
//                   onClick={deleteTodo}
//                   id={todo.id}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Todo;

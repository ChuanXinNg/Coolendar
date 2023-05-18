import React, { useState } from "react";
import Calendar from 'react-calendar'; 
import coolendarLogo from './Coolendar logo.jpg';
import './App.css';

function App() {
  // const [user, setUserPair] = useState({});

  // const findPassword = (email) => {
  //   return user[email];
  // };

  const [date, setDate] = useState(new Date());

  // function signUp() {
  //   const email = document.getElementById('user-email');
  //   const password = document.getElementById('user-password');

  //   if (email !== '' && password !== '') {
  //     const updatedUserPairs = { ...user, [email]: password };
  //     setUserPair(updatedUserPairs);
  //   } else {
  //     const element = document.createElement('div');
  //     element.innerText = 'Invalid input!';
  //     reset(element);
  //   }

  //   console.log('sign up');

  //   // Clear input fields after signing up
  //   document.getElementById('user-email').value = '';
  //   document.getElementById('user-password').value = '';  

  // }
    
  // function logIn() {
  //   const email = document.getElementById('user-email').value;
  //   const password = document.getElementById('user-password').value;

  //   const pwd = findPassword(email);

  //   const element = document.createElement('div');

  //   console.log('log in');

  //   if (pwd !== undefined) {
  //     if (pwd !== password) {
  //       element.innerText = 'Wrong password!';
  //     } else {
  //       element.innerText = 'Successfully logged in!';
  //     }
  //   } else {
  //     element.innerText = 'Invalid Email!';
  //   }
    
  //   reset(element);
  // }

  // function reset(element) {
  //   // Clear input fields after signing up
  //   document.getElementById('user-email').value = '';
  //   document.getElementById('user-password').value = ''; 
  //   const user = document.getElementById('testing');
  //   user.innerHTML = ''; // Clear existing content
  //   user.appendChild(element);
  // }

    return (
      <div className="Coolendar-App">
        <div className="header">
          <img className="App-logo" src={coolendarLogo} alt="logo" />
          <button className="year">2023</button>
        </div>

        <div>
          {/* <div className="calendar-container">
            <Calendar className="calendar" onChange={setDate} value={date}/>
          </div>
          <div className="text-center">
              Selected date: {date.toDateString()}
          </div> */}

<div>
     <Calendar onChange={setDate} value={date} selectRange={true}/>
   </div>
   {date.length > 0 ? (
   <p>
     <span>Start:</span>{' '} {date[0].toDateString()}
     &nbsp; to &nbsp;
     <span>End:</span> {date[1].toDateString()}
   </p>
        ) : (
   <p>
     <span>Default selected date:</span>{' '} {date.toDateString()}
   </p>
        )}
 </div>

        </div>
    );

  
  // return (
  //   <div id="page" className="CoolendarLogin-App">
  //     <header className="AppLogin-header">
  //       <img src={coolendarLogo} className="AppLogin-logo" alt="logo" />

        
  //       <div className="login-form">
  //         <div className="login-title">Sign In</div>
          
  //         <div className="login-container">
  //           <div className="enterLogin">Email:</div>
  //           <input
  //           id="user-email"
  //           type="text"
  //           className="login-inputContainer"
  //           placeholder="Enter your Email here"
  //           />
  //         </div>

  //         <div className="login-container">
  //           <div className="enterLogin">Password:</div>
  //           <input
  //             id="user-password"
  //             type="password"
  //             className="login-inputContainer"
  //             placeholder="Enter your password here"
  //           />
  //         </div>

  //         <div>
  //           <button className="sign-in-buttons" onClick={logIn}>Log In</button>
  //         </div>

  //         <div>
  //           <button className="sign-in-buttons" onClick={signUp}>Sign Up</button>
  //         </div>

  //       </div>

  //       <div id="testing"></div>

  //     </header>
  //   </div>
  // );
}

export default App;
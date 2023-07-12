importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
  // Add your Firebase configuration options here
  apiKey: "AIzaSyCwrsCj7AJQfqtlVrHs7LLtI9BqfpZlY_o",
  authDomain: "coolendar-adbbc.firebaseapp.com",
  projectId: "coolendar-adbbc",
  storageBucket: "coolendar-adbbc.appspot.com",
  messagingSenderId: "365489619301",
  appId: "1:365489619301:web:df146da0a0b4703213618c",
  measurementId: "G-SDCP32MNXF"
});

const messaging = firebase.messaging();

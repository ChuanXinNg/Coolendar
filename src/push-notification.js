import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';


export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyCwrsCj7AJQfqtlVrHs7LLtI9BqfpZlY_o",
    authDomain: "coolendar-adbbc.firebaseapp.com",
    projectId: "coolendar-adbbc",
    storageBucket: "coolendar-adbbc.appspot.com",
    messagingSenderId: "365489619301",
    appId: "1:365489619301:web:df146da0a0b4703213618c",
    measurementId: "G-SDCP32MNXF"
  });
}

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await Notification.requestPermission();
    const token = await messaging.getToken();
    console.log('Your token is:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

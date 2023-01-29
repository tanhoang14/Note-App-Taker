// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHvAURk1nQDnQI2El8qcW8VoKAH9W8Kco",
  authDomain: "noteapp-7728c.firebaseapp.com",
  projectId: "noteapp-7728c",
  storageBucket: "noteapp-7728c.appspot.com",
  messagingSenderId: "648467772542",
  appId: "1:648467772542:web:79a937fb7f8c8b5193542f",
  measurementId: "G-6J4DKTXQDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
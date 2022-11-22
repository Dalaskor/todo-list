import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCuGIzwW8_esmrK7FzKkiTfJ0mNA2uPHiQ",
  authDomain: "todo-list-78e4b.firebaseapp.com",
  projectId: "todo-list-78e4b",
  storageBucket: "todo-list-78e4b.appspot.com",
  messagingSenderId: "1000760735350",
  appId: "1:1000760735350:web:747f97d3e6972587005157",
  measurementId: "G-H31Y9WRWPQ"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

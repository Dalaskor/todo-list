import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import firebase from "firebase/compat/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgzYYYXtlBOQTInmn9_4hpOuHK9HjBUCo",
  authDomain: "todo-list-65fc2.firebaseapp.com",
  projectId: "todo-list-65fc2",
  storageBucket: "todo-list-65fc2.appspot.com",
  messagingSenderId: "397547153921",
  appId: "1:397547153921:web:487c826ab6720c6fa26e00",
  measurementId: "G-FXD6W92LWE"
};

export const Context = createContext(null);

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

ReactDOM.createRoot(document.getElementById('root')).render(
	<Context.Provider value={{
		firebase,
		auth,
		firestore
	}}>
		<App />
	</Context.Provider>
)

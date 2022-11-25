/** @module App */
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import Header from "./components/Header/Header";
import { useContext } from 'react';
import { Context } from './main';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader/Loader';

/** Главный компонет приложения */
function App() {
	/** Получение данных пользователя через контекст */
	const {auth} = useContext(Context);
	const [user, loading, error] = useAuthState(auth);

	if(loading) {
		return <Loader/>
	}

  return (
    <BrowserRouter>
		<Header />
		<AppRouter />
    </BrowserRouter>
  );
}

export default App;

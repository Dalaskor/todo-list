/** @module AppRouter */
import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { privateRoutes, publicRoutes } from "../../routes";
import { LOGIN_ROUTE, TODO_ROUTE } from "../../utils/consts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../main';

/**
* Компонент для маршрутизации
* 
* @component
*/
const AppRouter = () => {
	/** Получение данных пользователя через контекст */
	const {auth} = useContext(Context);
	const [user] = useAuthState(auth);

	/** Роутинг приложения в зависимости от авторизации пользователя */
	return user ? (
		<Routes>
		  {privateRoutes.map(({ path, Component }) => (
			  <Route path={path} element={<Component/>} exact key={path} />
		  ))}
		  <Route path="*" element={<Navigate to={TODO_ROUTE} replace />}/>
		</Routes>
	  ) : (
		<Routes>
		  {publicRoutes.map(({ path, Component }) => (
			  <Route path={path} element={<Component/>} exact key={path} />
		  ))}
		  <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />}/>
		</Routes>
	  );
};

export default AppRouter;

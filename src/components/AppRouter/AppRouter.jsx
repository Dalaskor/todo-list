import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { privateRoutes, publicRoutes } from "../../routes";
import { LOGIN_ROUTE, TODO_ROUTE } from "../../utils/consts";

const AppRouter = () => {
  const user = false;

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

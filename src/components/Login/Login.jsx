/** @module Login */
import React, { useContext } from "react";
import style from './Login.module.less';
import {Context} from '../../main';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

/**
 * Компонент авторизации
 * @component
* */
const Login = () => {
	const {auth} = useContext(Context);

	/** Авторизация пользователя через Google Аккаунт */
	const login = async () => {
		const provider = new GoogleAuthProvider();
		const {user} = await signInWithPopup(auth, provider);
		console.log(user);
	};

	return (
		<section className={style.login}>
			<div className="login__container">
				<div onClick={login} className={style.login__btn}>
					ВОЙТИ С ПОМОЩЬЮ GOOGLE
				</div>
			</div>
		</section>
	);
};

export default Login;

import React, { useContext } from "react";
import style from './Header.module.less';
import { Context } from '../../main';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
	const {auth} = useContext(Context);
	const [user] = useAuthState(auth);

	return (
		<header className={style.header}>
			<div className={style.header__container}>
				<div className={style.header__logo}>ToDo List</div>
				{user && <a className={style.header__link}>Создать задачу</a>}
				{user && <a onClick={() => auth.signOut()} className={style.header__link}>Выйти</a>}
			</div>
		</header>
	);
};

export default Header;

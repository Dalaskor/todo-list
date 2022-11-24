import React, { useContext, useState } from "react";
import style from './Header.module.less';
import { Context } from '../../main';
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from "../Modal/Modal";
import CreateTask from "../Modal/CreateTask";

const Header = () => {
	const {auth} = useContext(Context);
	const [user] = useAuthState(auth);
	const [isModal, setModal] = useState(false);

	return (
		<header className={style.header}>
			<div className={style.header__container}>
				<div className={style.header__logo}>ToDo List</div>
				{user && <a onClick={() => {setModal(true)}} className={style.header__link}>Создать задачу</a>}
				{user && <a onClick={() => auth.signOut()} className={style.header__link}>Выйти</a>}
				<Modal
					isVisible={isModal}
					title="Новая задача"
					content={<CreateTask onCreate={() => setModal(false)}/>}
					onClose={() => setModal(false)}
				/>
			</div>
		</header>
	);
};

export default Header;

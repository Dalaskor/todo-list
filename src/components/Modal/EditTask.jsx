/** 
 * @module EditTask
* */
import React, { useContext, useState } from "react";
import style from './CreateTask.module.less';
import Loader from "../Loader/Loader";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Context} from '../../main';
import { useAuthState } from "react-firebase-hooks/auth";
import {collection, doc, addDoc, setDoc, Timestamp} from 'firebase/firestore';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import dayjs from 'dayjs';

/**
 * Компонент модального окна для редактирования задач
 *
 * @component
 * @param {string} taskId - Идентификатор задачи в базе данных
 * @param {Function} onCreate - Событие при успешном редактировании задачи
* */
const EditTask = ({taskId, onCreate}) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [files, setFiles] = useState([]);

	const {auth, firestore} = useContext(Context);
	const [user] = useAuthState(auth);
	const [task, loading] = useCollectionData(
		collection(firestore, 'tasks')
	);

	/**
	 * Событие выполнения формы
	* */
	const submitHandler = async (event) => {
		event.preventDefault();

		if(title.trim().length === 0) {
			return;
		}

		const userFilePaths = [];

		if(files.length > 0) {
			const storage = getStorage();

			for(let i = 0; i < files.length; i+=1) {
				const mountainUserRef = ref(storage, `${user.uid}/${files[i].name}`);
				uploadBytes(mountainUserRef, files[i].file).then((snapshot) => {
					console.log('Uploaded a file');
				});
				userFilePaths.push(mountainUserRef.fullPath);
			}
		}

		let isFailed = false;

		if (dayjs(date).diff(dayjs()) < 0) {
			isFailed = true;
		}

		const taskObj = {
			uid: user.uid,
			title: title,
			description: description,
			date: date ? dayjs().format(date) : '',
			files: userFilePaths,
			createdAt: dayjs().format(),
			isChecked: false,
			isFailed: isFailed,
		}

		await setDoc(doc(firestore, 'tasks', `${taskId}`), taskObj);

		console.log('Uploaded a task');

		setTitle('');
		setDescription('');
		setDate('');
		setFiles('');

		onCreate();
	};

	/** Обработчик события ввода заголовка задачи */
	const titleChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	/** Обработчик события ввода описания задачи */
	const descriptionChangeHandler = (event) => {
		setDescription(event.target.value)
	};

	/** Обработчик события ввода даты окончания задачи */
	const dateChangeHandler = (event) => {
		setDate(event.target.value);
	};

	/** Обработчик события добавления файлов задачи */
	const filesChangeHandler = (event) => {
		const filesFromInput = Array.from(event.target.files);
		setFiles(filesFromInput);
	};

	if (loading) {
		return <Loader/>
	}

	return (
		<div className={style.task}>
			<div className={style.task__container}>
				<form onSubmit={submitHandler} className={style.task__form}>
					<div className={style.task__prop}>
						<p className={style.task__title}>Заголовок</p>
						<input onChange={titleChangeHandler} type="text" className={style.task__input}/>
					</div>
					<div className={style.task__prop}>
						<p className={style.task__title}>Описание</p>
						<textarea onChange={descriptionChangeHandler} className={style.task__textarea}></textarea>
					</div>
					<div className={style.task__prop}>
						<p className={style.task__title}>Дата завершения</p>
						<input onChange={dateChangeHandler} type="date" className={style.task__input}/>
					</div>
					<div className={style.task__prop}>
						<p className={style.task__title}>Файлы</p>
						<input onChange={filesChangeHandler} type="file" className={style.task__input} multiple/>
					</div>
					<button type={"submit"} className={style.task__submit}>Изменить</button>
				</form>
			</div>
		</div>
	);
};

export default EditTask;

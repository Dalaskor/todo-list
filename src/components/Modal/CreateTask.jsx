import React from "react";
import style from './CreateTask.module.less';

const CreateTask = () => {
	return (
		<div className={style.task}>
			<div className={style.task__container}>
				<form className={style.task__form} action="POST">
					<div className={style.task__prop}>
						<p className={style.task__title}>Заголовок</p>
						<input id="title" type="text" className={style.task__input}/>
					</div>
					<div className={style.task__prop}>
						<p className={style.task__title}>Описание</p>
						<textarea id="description" className={style.task__textarea}></textarea>
					</div>
					<div className={style.task__prop}>
						<p className={style.task__title}>Дата завершения</p>
						<input id="date" type="date" className={style.task__input}/>
					</div>
					<div className={style.task__prop}>
						<p className={style.task__title}>Файлы</p>
						<input id="files" type="file" className={style.task__input} multiple/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateTask;

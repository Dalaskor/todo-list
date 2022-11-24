import React from "react";
import style from './Task.module.less';

const Task = ({task, taskId}) => {
	const files = [];

	return (
		<div className={style.task}>
			<div className={style.task__container}>
				<div className={style.task__header}>
					<div className={style.task__checker}></div>
					<div className={style.task__title}>{task.title}</div>
					<div className={style.task__enddate}>{task.date}</div>
				</div>
				<div className={style.task__body}>
					<div className={style.task__description}>
						{task.description}
					</div>
					<div className={style.task__files}>
						{files && files.map((file) => {
							<div className={style.task__file}>
								<div className={style.task__fileicon}></div>
								<div className={style.task__filename}>{file.name}</div>
							</div>
						})}
					</div>
				</div>
				<div className={style.task__footer}>
					<div className={style.task__btnEdit}></div>
				</div>
			</div>
		</div>
	);
};

export default Task;

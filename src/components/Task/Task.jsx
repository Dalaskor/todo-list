/** @module Task */
import React, { useContext, useEffect, useState } from "react";
import style from './Task.module.less';
import { getStorage, ref } from 'firebase/storage';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Context } from '../../main';
import dayjs from "dayjs";
import EditTask from "../Modal/EditTask";
import Modal from "../Modal/Modal";

/**
 * Компонент задачи
 *
 * @component
 * @param {object} task - Объект с данными задачи
 * @param {string} taskId - Идентификатор задачи в базе данных
* */
const Task = ({task, taskId}) => {
	const storage = getStorage();
	const {auth, firestore} = useContext(Context);
	const [isModal, setModal] = useState(false);
	const files = [];
	const fetchedUrls = [];

	task.files.map((file) => {
		const reference = ref(storage, `${file}`);
		const [downloadUrl, loading, error] = useDownloadURL(reference);
		if(!loading) {
			fetchedUrls.push(downloadUrl);
			files.push(`${file}`.substring(`${file}`.indexOf('/') + 1));
		} else {
			return <></>
		}
	})

	/**
	 * Обработчик проверки сроков выполнения задачи
	* */
	const failHandle = async () => {
		await setDoc(doc(firestore, 'tasks', `${taskId}`), {
			uid: task.uid,
			title: task.title,
			description: task.description,
			date: task.date,
			files: task.files,
			createdAt: task.createdAt,
			isChecked: task.isChecked,
			isFailed: true,
		});
	};

	/**
	 * Обработчик выполнения задачи
	* */
	const clickDoneHandle = async () => {
		await setDoc(doc(firestore, 'tasks', `${taskId}`), {
			uid: task.uid,
			title: task.title,
			description: task.description,
			date: task.date,
			files: task.files,
			createdAt: task.createdAt,
			isChecked: true,
			isFailed: task.isFailed,
		});
	};

	/**
	 * Обработчик отмены выполнения задачи
	* */
	const clickNoDoneHandle = async () => {
		await setDoc(doc(firestore, 'tasks', `${taskId}`), {
			uid: task.uid,
			title: task.title,
			description: task.description,
			date: task.date,
			files: task.files,
			createdAt: task.createdAt,
			isChecked: false,
			isFailed: task.isFailed,
		});
	};

	/**
	 * Обработчик удаления задачи
	* */
	const clickDeleteHandle = async () => {
		await deleteDoc(doc(firestore, 'tasks', `${taskId}`));
	};

	useEffect(() => {
		if(dayjs().diff(dayjs(task.date)) > 0) {
			failHandle();
		}
	});

	return (
		<div className={style.task}>
			<div className={style.task__content}>
				<div className={style.task__header}>
					{(!task.isFailed && !task.isChecked) && (
						<div onClick={clickDoneHandle} className={style.task__checker}></div>
						)}
					{(task.isFailed && !task.isChecked) && (
						<div className={style.task__checkerFailed}>
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.15408 0.519199L12.5 9.86478L21.8075 0.557658C22.1371 0.20691 22.5953 0.00557658 23.0767 0C24.1387 0 24.9997 0.860909 24.9997 1.92296C25.0087 2.39947 24.8208 2.85867 24.4805 3.19211L15.0769 12.4992L24.4805 21.9025C24.7974 22.2125 24.9833 22.6325 24.9997 23.0755C24.9997 24.1376 24.1387 24.9985 23.0767 24.9985C22.5811 25.0191 22.0998 24.8306 21.7498 24.4793L12.5 15.1337L3.17331 24.46C2.84505 24.7991 2.39506 24.9929 1.92334 24.9985C0.861252 24.9985 0.00031167 24.1376 0.00031167 23.0755C-0.00872657 22.599 0.179153 22.1398 0.519529 21.8064L9.92314 12.4992L0.519529 3.09596C0.202614 2.78598 0.0166574 2.36601 0.00031167 1.92296C0.00031167 0.860909 0.861252 0 1.92334 0C2.38564 0.00557658 2.82736 0.191911 3.15408 0.519199Z" fill="white"/>
</svg>
						</div>
						)}
					{(!task.isFailed && task.isChecked) && (
						<div onClick={clickNoDoneHandle} className={style.task__checkerDone}>
<svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.092 6.38305L13.7382 23.1032C12.5271 24.3417 10.5627 24.3417 9.35051 23.1032L0.90857 14.4709C-0.302908 13.2324 -0.302908 11.2236 0.90857 9.98489C2.12028 8.74596 4.08459 8.74596 5.29576 9.98442L11.545 16.3742L25.7041 1.89681C26.9158 0.65787 28.8803 0.658809 30.0915 1.89681C31.3028 3.13551 31.3028 5.14365 30.092 6.38305Z" fill="white"/>
</svg>
						</div>
					)}
					<div className={style.task__title}>{task.title}</div>
					<div className={style.task__enddate}>{task.date}</div>
					<div className={style.task__dropdown}>
						<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0L5 5L10 0" fill="black"/>
						</svg>
					</div>
				</div>
				<div className={style.task__body}>
					<div className={style.task__description}>
						{task.description}
					</div>
					{files.length > 0 && (
						<div className={style.task__files}>
							<p>Прикрепленные файлы:</p>
							{ files.map((file, inx) => (
								<a className={style.task__file} key={fetchedUrls[inx]} href={fetchedUrls[inx]}>
									<div className={style.task__fileicon}>
										<svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18.4777 4.98488C18.4769 4.97655 18.4755 4.96845 18.4741 4.96035C18.4736 4.95765 18.4734 4.95486 18.4728 4.95216C18.4709 4.94248 18.4684 4.93303 18.4657 4.92371C18.4654 4.92259 18.4651 4.92137 18.4648 4.92024C18.4619 4.91066 18.4584 4.9013 18.4547 4.89211C18.4543 4.89117 18.454 4.89018 18.4537 4.88923C18.45 4.88046 18.4459 4.87195 18.4416 4.86358C18.4408 4.86218 18.4402 4.86074 18.4395 4.85935C18.4353 4.85156 18.4307 4.84409 18.426 4.83666C18.4248 4.83477 18.4237 4.83279 18.4225 4.83095C18.4179 4.82401 18.4128 4.81744 18.4077 4.81087C18.406 4.80871 18.4045 4.80646 18.4028 4.80434C18.3964 4.79656 18.3895 4.78913 18.3825 4.78193C18.3818 4.78125 18.3813 4.78053 18.3806 4.77986L13.6996 0.0988415C13.6988 0.0980313 13.6979 0.0973562 13.697 0.096546C13.69 0.0896595 13.6828 0.082998 13.6751 0.0767417C13.6727 0.0747162 13.6701 0.0730059 13.6675 0.0710704C13.6613 0.0662544 13.6552 0.0614384 13.6486 0.0570724C13.6463 0.0555421 13.6439 0.0542818 13.6416 0.0527965C13.6346 0.0483405 13.6276 0.0439295 13.6202 0.0400137C13.6186 0.0391585 13.6169 0.0384384 13.6152 0.0376282C13.6071 0.0334423 13.5988 0.0293914 13.5903 0.0258356C13.5892 0.0253855 13.5881 0.0250704 13.587 0.0246204C13.5779 0.0209746 13.5687 0.0175538 13.5593 0.0146732C13.558 0.0143131 13.5568 0.0140881 13.5556 0.013728C13.5463 0.0110274 13.5369 0.00855186 13.5273 0.00661644C13.5245 0.00603131 13.5216 0.00580626 13.5187 0.00531115C13.5107 0.00391585 13.5028 0.00252055 13.4946 0.00171037C13.4834 0.000585127 13.4722 0 13.4609 0H2.29843C1.31812 0 0.520546 0.797573 0.520546 1.77789V21.2221C0.520546 22.2024 1.31812 23 2.29843 23H16.7016C17.6819 23 18.4794 22.2024 18.4794 21.2221V5.01859C18.4794 5.00729 18.4789 4.99604 18.4777 4.98488ZM13.7984 1.15252L17.3269 4.68102H14.9012C14.2931 4.68102 13.7984 4.18636 13.7984 3.57828V1.15252ZM16.7016 22.3249H2.29843C1.6904 22.3249 1.19569 21.8302 1.19569 21.2221V1.77789C1.19569 1.1698 1.6904 0.675147 2.29843 0.675147H13.1233V3.57828C13.1233 4.55859 13.9209 5.35616 14.9012 5.35616H17.8043V21.2221C17.8043 21.8302 17.3096 22.3249 16.7016 22.3249Z" fill="black"/>
										</svg>
									</div>
									<div className={style.task__filename}>{file}</div>
								</a>
							)) }
						</div>
						)}
				</div>
				<div className={style.task__footer}>
					<div onClick={() => setModal(true)} className={style.task__btnEdit}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g>
							<path d="M19.4183 2.59237V2.27802C19.4183 1.02062 18.3977 0 17.1403 0C15.8829 0 14.8622 1.02062 14.8622 2.27802V2.59237H19.4183Z" fill="white"/>
							<path d="M14.107 17.9424H1.60239C1.03493 17.9424 0.573608 18.4038 0.573608 18.9712C0.573608 19.5387 1.03493 20 1.60239 20H15.5195L14.107 17.9424Z" fill="white"/>
							<path d="M13.5314 5.60522H1.60239C1.03493 5.60522 0.573608 6.06654 0.573608 6.63401C0.573608 7.20147 1.03493 7.66279 1.60239 7.66279H13.5314V5.60522Z" fill="white"/>
							<path d="M13.5314 9.71628H1.60239C1.03493 9.71628 0.573608 10.1776 0.573608 10.7451C0.573608 11.3125 1.03493 11.7738 1.60239 11.7738H13.5314V9.71628Z" fill="white"/>
							<path d="M13.5314 13.8273H1.60239C1.03493 13.8273 0.573608 14.2886 0.573608 14.8561C0.573608 15.4235 1.03493 15.8849 1.60239 15.8849H13.5314V13.8273Z" fill="white"/>
							<path d="M14.8663 3.92734V16.7014L16.9402 19.6979C17.0382 19.8408 17.2505 19.8408 17.3526 19.6979L19.4264 16.7014V3.92734H14.8663Z" fill="white"/>
							</g>
							<defs>
							<clipPath id="clip0_2_145">
							<rect width="20" height="20" fill="white"/>
							</clipPath>
							</defs>
						</svg>
					</div>
					<div onClick={clickDeleteHandle} className={style.task__btnDelete}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.5276 1.71558H10.763V0H5.65099V1.71558H1.88647V4.42438H14.5276V1.71558V1.71558ZM7.00539 1.3544H9.40864V1.71558H7.00539V1.3544Z" fill="white"/>
							<path d="M13.3247 9.67539L13.5803 5.77878H2.83386L3.69237 18.8713H8.84686C8.17594 17.9202 7.78131 16.7609 7.78131 15.5111C7.78131 12.3896 10.2415 9.83201 13.3247 9.67539Z" fill="white"/>
							<path d="M13.6246 11.0222C11.1494 11.0222 9.13568 13.0359 9.13568 15.511C9.13568 17.9862 11.1494 20 13.6246 20C16.0998 20 18.1136 17.9863 18.1136 15.511C18.1136 13.0358 16.0998 11.0222 13.6246 11.0222ZM16.0705 16.9992L15.1128 17.9569L13.6246 16.4687L12.1364 17.9569L11.1788 16.9992L12.6669 15.511L11.1788 14.0229L12.1364 13.0652L13.6246 14.5534L15.1128 13.0652L16.0705 14.0229L14.5823 15.511L16.0705 16.9992Z" fill="white"/>
						</svg>
					</div>
				</div>
			</div>

			<Modal
				isVisible={isModal}
				title="Редактировать задачу"
				content={<EditTask taskId={taskId} onCreate={() => setModal(false)}/>}
				onClose={() => setModal(false)}
			/>
		</div>
	);
};

export default Task;

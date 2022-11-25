import React, { useContext } from "react";
import style from './Todo.module.less';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { Context } from '../../main';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Task from "../Task/Task";
import Loader from "../Loader/Loader";

const Todo = () => {
	const {auth, firestore} = useContext(Context);
	const [user] = useAuthState(auth);

	const tasksRef = collection(firestore, 'tasks');
	const tasksQuery = query(tasksRef,
		where('uid', '==', `${user.uid}`));
	const [tasks, loading, error] = useCollection(tasksQuery);

	return (
		<section className={style.todo}>
			<div className="todo__container">
				{error && <strong>Error: {JSON.stringify(error)}</strong>}
				{loading && <Loader/>}
				{tasks && (
					<div className={style.todo__list}>
						{tasks.docs.map((task) => (
							<React.Fragment key={task.id}>
								<Task task={task.data()} taskId={task.id}/>
							</React.Fragment>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Todo;

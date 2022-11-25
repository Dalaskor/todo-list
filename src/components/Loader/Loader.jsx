/** @module Loader */
import React from 'react';
import style from './Loader.module.less';

/**
 * Компонент загрузчика
 * @component
*/
const Loader = () => {
	return (
		<section className={style.loader}>
			<div className="loader__container">
				<div className={style.lds_ring}><div></div><div></div><div></div><div></div></div>
			</div>
		</section>
	);
};

export default Loader;

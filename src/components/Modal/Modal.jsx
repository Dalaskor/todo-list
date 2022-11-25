/** 
 * @module Modal
 * Оболочка для модальны окон
*/
import React from "react";
import './Modal.less';

/**
* Компонент оболочки для мобольных окон
*
* @component
* @param {boolean} isVisible - Видимость модального окна
* @param {string} title - Заголовок модального окна
* @param {React.Component} content - Компоннет для контентной части
* @param {Function} onClose - Событие закрытия модального окна
*/
const Modal = ({ isVisible = false, title, content, onClose}) => {
	/** Событие закрытия модального окна на клавишу Escape*/
	const keydownHandler = ({ key }) => {
		switch (key) {
			case 'Escape':
				onClose();
				break;
			default:
		}
	};

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

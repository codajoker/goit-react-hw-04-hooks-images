import styles from './Modal.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export function Modal({ toogleModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toogleModal(e);
    }
  };
  const handleackdropClick = e => {
    if (e.currentTarget === e.target) {
      toogleModal(e);
    }
  };
  return createPortal(
    <div className={styles.Overlay} onClick={handleackdropClick}>
      <div className={styles.Modal}>
        <button
          onClick={e => {
            toogleModal(e);
          }}
          className={styles.ButtonCloseModal}
          type="button"
        >
          {' '}
          <AiFillCloseCircle></AiFillCloseCircle>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string,
  toogleModal: PropTypes.func.isRequired,
};

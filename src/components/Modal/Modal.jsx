import React from "react";
import styles from "./Modal.module.css";

export const Modal = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  if (!props.show) {
    return null;
  } else {
    return (
      <div className={`${styles.modal} ${props.show ? styles.show : ""}`}>
        <div className={styles.modalContent}>
          <img
            className={styles.modalImage}
            src={props.imageUrl}
            alt="Modal Content"
          />
          <button className={styles.modalButton} onClick={handleClose}>
            close
          </button>
        </div>
      </div>
    );
  }
};

"use client";
import React, { useEffect } from "react";
import styles from "./popup.module.scss";
import { IoClose } from "react-icons/io5";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
  showCloseBtn?: boolean;
  customClass?: string;
  onClose: () => void;
  noOutsideClickClose?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  showCloseBtn = true,
  customClass,
  noOutsideClickClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
      onClick={!noOutsideClickClose ? onClose : () => {}}
    >
      <div
        className={`${styles.popup} ${
          isOpen ? styles.popupEnter : styles.popupExit
        } ${customClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseBtn && (
          <div className={styles.close_icon_wrapper}>
            <IoClose
              className={styles.close_icon}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Popup;

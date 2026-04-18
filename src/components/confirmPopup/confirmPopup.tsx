import React from "react";
import Popup from "../popup/popup";
import Button from "../button/button";
import styles from "./confirmPopup.module.scss";

interface IConfirmPopupPorps {
  isOpen: boolean;
  noOutsideClickClose?: boolean;
  showCloseBtn?: boolean;
  titleText?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}
const ConfirmPopup: React.FC<IConfirmPopupPorps> = ({
  isOpen,
  noOutsideClickClose = true,
  showCloseBtn = false,
  titleText = "Are you sure?",
  cancelBtnText = "Cancel",
  confirmBtnText = "Confirm",
  onCancel,
  onConfirm,
  onClose,
}) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      noOutsideClickClose={noOutsideClickClose}
      showCloseBtn={showCloseBtn}
    >
      <div className={styles.ConfirmPopup}>
        <p className={styles.ConfirmPopup_title}>{titleText}</p>
        <div className={styles.ConfirmPopup_btn_wrapper}>
          <Button
            variant="secondary"
            content={cancelBtnText}
            onClick={onCancel}
          />
          <Button
            variant="primary"
            content={confirmBtnText}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmPopup;

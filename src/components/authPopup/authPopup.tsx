import React, { useEffect, useState } from "react";
import Popup from "../popup/popup";
import Button from "../button/button";
import styles from "./authPopup.module.scss";
import Input from "../input/input";
import { IoPersonOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { TAuthInputFieldData } from "@/types/authPopupTypes";

interface IAuthPopupProps {
  isOpen: boolean;
  title?: string;
  dataObj: any;
  inputFieldList: TAuthInputFieldData[];
  isSubmitBtnLoading: boolean;
  showInFullScreen?: boolean;
  resetForm: () => void;
  onClose: () => void;
  onInputFieldChange: (
    data: TAuthInputFieldData,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthPopup: React.FC<IAuthPopupProps> = ({
  isOpen,
  title,
  dataObj,
  inputFieldList,
  isSubmitBtnLoading,
  showInFullScreen,
  resetForm,
  onClose,
  onInputFieldChange,
  onSubmit,
}) => {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} noOutsideClickClose={true} showInFullScreen={showInFullScreen}>
      {title && <h1 className={styles.AuthPopup_title}>{title}</h1>}
      <form className={styles.AuthPopup_form_wrapper} onSubmit={onSubmit}>
        {inputFieldList &&
          inputFieldList.map((data) => (
            <Input
              key={data.id}
              type={data?.type}
              label={data.label}
              Icon={data.Icon}
              value={dataObj[data.name]}
              placeholder={data.placeholder}
              onChange={(e) => onInputFieldChange(data, e)}
              required={data.required}
            />
          ))}
        <Button
          className={styles.AuthPopup_submit_btn}
          content="Create Account"
          type="submit"
          isLoading={isSubmitBtnLoading}
        />
      </form>
    </Popup>
  );
};

export default AuthPopup;

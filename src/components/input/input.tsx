import React from "react";
import { IconType } from "react-icons";
import styles from "./input.module.scss";

interface IInputProps {
  label?: string;
  value: string | number;
  type?: string; // 'text', 'email', 'textarea', etc.
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  name?: string;
  customContainerClass?: string;
  customWrapperClass?: string;
  customInputBoxClass?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  Icon?: IconType;
}

const Input: React.FC<IInputProps> = ({
  label,
  value,
  type = "text",
  disabled,
  placeholder,
  required,
  name,
  customContainerClass,
  customWrapperClass,
  customInputBoxClass,
  Icon,
  onChange,
}) => {
  const isTextArea = type === "textarea";

  return (
    <div className={`${styles.Input} ${customContainerClass || ""}`}>
      {label && <label className={styles.Input_label}>{label}</label>}
      <div
        className={`${styles.Input_wrapper} ${
          Icon ? styles.Input_wrapper_with_icon : ""
        } ${customWrapperClass || ""}`}
      >
        {Icon && <Icon className={styles.Input_icon} />}
        {isTextArea ? (
          <textarea
            className={`${styles.Input_input_field} ${
              !Icon ? styles.Input_input_field_without_icon : ""
            } ${styles.Input_textarea} ${customInputBoxClass || ""}`}
            value={value}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            required={required}
            onChange={onChange}
            rows={4}
          />
        ) : (
          <input
            className={`${styles.Input_input_field} ${
              !Icon ? styles.Input_input_field_without_icon : ""
            } ${customInputBoxClass || ""}`}
            value={value}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            required={required}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default Input;

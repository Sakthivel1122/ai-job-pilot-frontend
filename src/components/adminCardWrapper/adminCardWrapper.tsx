import React from "react";
import styles from "./adminCardWrapper.module.scss";

interface IAdminCardWrapperProps {
  children: React.ReactNode;
  customClass?: string;
  title?: string;
}

const AdminCardWrapper: React.FC<IAdminCardWrapperProps> = ({
  children,
  customClass,
  title = "Title",
}) => {
  return (
    <div className={`${styles.AdminCardWrapper} ${customClass}`}>
      {title && <p className={styles.AdminCardWrapper_title}>{title}</p>}
      {children}
    </div>
  );
};

export default AdminCardWrapper;

import React from "react";
import styles from "./adminNavBar.module.scss";

const AdminNavBar = () => {
  return (
    <div className={styles.AdminNavBar}>
      <p className={styles.AdminNavBar_text}>Admin Dashboard</p>
    </div>
  );
};

export default AdminNavBar;

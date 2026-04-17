import AdminSidebar from "@/containers/admin/adminSidebar/adminSidebar";
import React, { ReactNode } from "react";
import styles from "./adminLayout.module.scss";
import AdminNavBar from "@/containers/admin/adminNavBar/adminNavBar";

interface IAdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<IAdminLayoutProps> = ({ children }) => {
  return (
    <div className={styles.AdminLayout}>
      <AdminSidebar />
      <div className={styles.AdminLayout_right}>
        <AdminNavBar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

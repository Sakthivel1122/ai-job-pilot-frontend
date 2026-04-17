"use client";
import React from "react";
import styles from "./adminSidebar.module.scss";
import { FiShield } from "react-icons/fi";
import { AdminSideBarItems } from "@/constants/admin";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.AdminSidebar}>
      <div className={styles.AdminSidebar_header}>
        <div className={styles.AdminSidebar_logo_wrapper}>
          <FiShield className={styles.AdminSidebar_logo} />
        </div>
        <div className={styles.AdminSidebar_details}>
          <p className={styles.AdminSidebar_details_text1}>Admin Panel</p>
          <p className={styles.AdminSidebar_details_text2}>Manage everything</p>
        </div>
      </div>
      <div className={styles.AdminSidebar_content}>
        {AdminSideBarItems.map(({ Icon, ...data }) => {
          return (
            <Link
              href={data.link}
              className={`${styles.AdminSidebar_item} ${
                pathname === data.link ? styles.active : ""
              }`}
            >
              {Icon && <Icon className={styles.AdminSidebar_item_icon} />}
              <p className={styles.AdminSidebar_item_text}>{data.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;

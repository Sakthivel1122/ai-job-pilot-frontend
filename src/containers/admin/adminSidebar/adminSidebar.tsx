"use client";
import React, { useState } from "react";
import styles from "./adminSidebar.module.scss";
import { FiShield } from "react-icons/fi";
import { AdminSideBarItems } from "@/constants/admin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { REACT_ICONS } from "@/constants/react-icons";
import ConfirmPopup from "@/components/confirmPopup/confirmPopup";
import { handleLogout } from "@/utils/sharedFunctions";
import { ROUTES } from "@/constants/app-constants";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [logoutPopup, setLogoutPopup] = useState<boolean>(false);

  const handleOnCloseLogoutPopup = () => {
    setLogoutPopup(false);
  };

  const logoutOnClick = () => {
    setLogoutPopup(true);
  };

  const handleConfirmLogoutClick = () => {
    handleLogout(ROUTES.HOME);
  };
  return (
    <>
      <div className={styles.AdminSidebar}>
        <div>
          <div className={styles.AdminSidebar_header}>
            <div className={styles.AdminSidebar_logo_wrapper}>
              <FiShield className={styles.AdminSidebar_logo} />
            </div>
            <div className={styles.AdminSidebar_details}>
              <p className={styles.AdminSidebar_details_text1}>Admin Panel</p>
              <p className={styles.AdminSidebar_details_text2}>
                Manage everything
              </p>
            </div>
          </div>
          <div className={styles.AdminSidebar_content}>
            {AdminSideBarItems.map(({ Icon, ...data }) => {
              return (
                <Link
                  key={data.id}
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
        <div className={styles.AdminSidebar_bottom_content}>
          <div
            className={`${styles.AdminSidebar_item} ${styles.AdminSidebar_logout_btn_wrapper}`}
            onClick={logoutOnClick}
          >
            <REACT_ICONS.LOGOUT className={styles.AdminSidebar_item_icon} />
            <p className={styles.AdminSidebar_item_text}>Logout</p>
          </div>
        </div>
      </div>
      <ConfirmPopup
        isOpen={logoutPopup}
        titleText="Are you sure you want to log out?"
        confirmBtnText="Log Out"
        onClose={handleOnCloseLogoutPopup}
        onCancel={handleOnCloseLogoutPopup}
        onConfirm={handleConfirmLogoutClick}
      />
    </>
  );
};

export default AdminSidebar;

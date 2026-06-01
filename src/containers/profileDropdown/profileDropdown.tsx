"use client";
import React, { forwardRef } from "react";
import styles from "./profileDropdown.module.scss";
import { TSessionUserData } from "@/types/sessionDataTypes";
import Button from "@/components/button/button";
import { useTheme } from "next-themes";
import { REACT_ICONS } from "@/constants/react-icons";

interface IProfileDropdownProps {
  userData: TSessionUserData;
  onLogoutClick: () => void;
}
const ProfileDropdown = forwardRef<HTMLDivElement, IProfileDropdownProps>(
  ({ userData, onLogoutClick }, ref) => {
    const { theme, setTheme } = useTheme();

    const handleThemeOnChange = (theme: "light" | "dark" | "system") => {
      setTheme(theme);
    };

    const TickIcon = () => <REACT_ICONS.TICK size={16} />;
    return (
      <div className={styles.ProfileDropdown} ref={ref}>
        <div className={styles.ProfileDropdown_section_wrapper}>
          <p className={styles.ProfileDropdown_name}>{userData?.name}</p>
          <p className={styles.ProfileDropdown_email}>{userData?.email}</p>
        </div>
        <div className={styles.ProfileDropdown_line} />
        <div className={styles.ProfileDropdown_section_wrapper}>
          <p className={styles.ProfileDropdown_section_title}>Theme</p>
          <div
            className={`${styles.ProfileDropdown_section_item} ${theme === "light" && styles.active}`}
            onClick={() => {
              handleThemeOnChange("light");
            }}
          >
            <p>Light Mode</p>
            {theme === "light" && <TickIcon />}
          </div>
          <div
            className={`${styles.ProfileDropdown_section_item} ${theme === "dark" && styles.active}`}
            onClick={() => {
              handleThemeOnChange("dark");
            }}
          >
            <p>Dark Mode</p>
            {theme === "dark" && <TickIcon />}
          </div>
          <div
            className={`${styles.ProfileDropdown_section_item} ${theme === "system" && styles.active}`}
            onClick={() => {
              handleThemeOnChange("system");
            }}
          >
            <p>System</p>
            {theme === "system" && <TickIcon />}
          </div>
        </div>
        <div className={styles.ProfileDropdown_line} />
        <div className={styles.ProfileDropdown_section_wrapper}>
          <Button
            content="Logout"
            variant="transparent"
            className={styles.ProfileDropdown_logout_btn}
            textCustomClass={styles.ProfileDropdown_logout_btn_text}
            onClick={onLogoutClick}
          />
        </div>
      </div>
    );
  },
);

export default ProfileDropdown;

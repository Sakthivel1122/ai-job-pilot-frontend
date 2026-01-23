import React, { forwardRef } from "react";
import styles from "./profileDropdown.module.scss";
import { TSessionUserData } from "@/types/sessionDataTypes";
import Button from "@/components/button/button";

interface IProfileDropdownProps {
  userData: TSessionUserData;
  onLogoutClick: () => void;
}
const ProfileDropdown = forwardRef<HTMLDivElement, IProfileDropdownProps>(
  ({ userData, onLogoutClick }, ref) => {
    return (
      <div className={styles.ProfileDropdown} ref={ref}>
        <div className={styles.ProfileDropdown_section_wrapper}>
          <p className={styles.ProfileDropdown_name}>{userData?.name}</p>
          <p className={styles.ProfileDropdown_email}>{userData?.email}</p>
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

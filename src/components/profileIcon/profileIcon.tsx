import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import styles from "./profileIcon.module.scss";
import { GoPerson } from "react-icons/go";

interface IProfileIconProps {
  className?: string;
  onClick?: () => void;
}

const ProfileIcon: React.FC<IProfileIconProps> = ({
  className = "",
  onClick,
}) => {
  return (
    <GoPerson
      className={`${styles.ProfileIcon} ${className}`}
      onClick={onClick}
    />
  );
};

export default ProfileIcon;

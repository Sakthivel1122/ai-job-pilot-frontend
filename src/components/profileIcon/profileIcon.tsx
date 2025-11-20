import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import styles from "./profileIcon.module.scss";

interface IProfileIconProps {
  className?: string;
  onClick?: () => void;
}

const ProfileIcon: React.FC<IProfileIconProps> = ({
  className = "",
  onClick,
}) => {
  return (
    <BsPersonCircle
      className={`${styles.ProfileIcon} ${className}`}
      onClick={onClick}
    />
  );
};

export default ProfileIcon;

"use client";

import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import styles from "./dropdown.module.scss";
import { TDropdownOptionData } from "@/types/dropdown";
import { IoChevronDown } from "react-icons/io5";

interface DropdownProps {
  buttonLabel: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  options: TDropdownOptionData[];
  onSelect: (value: TDropdownOptionData) => void;
  customClass?: string; // overall wrapper class
  buttonClass?: string; // for customizing the button
  menuClass?: string; // for customizing the dropdown menu
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonLabel,
  startIcon,
  endIcon = <IoChevronDown className={styles.end_icon} />,
  options,
  onSelect,
  customClass = "",
  buttonClass = "",
  menuClass = "",
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = (value?: TDropdownOptionData) => {
    setAnchorEl(null);
    if (value) onSelect(value);
  };

  return (
    <div className={`${styles.dropdownWrapper} ${customClass}`}>
      <Button
        id="dropdown-button"
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={`${styles.dropdownButton} ${buttonClass}`}
        // endIcon={
        //   <FiChevronDown
        //     className={`${styles.dropdownIcon} ${open ? styles.open : ""}`}
        //   />
        // }
        sx={{
          backgroundColor: "white", // normal color
          padding: "0.6rem 1rem",
          border: "1px solid rgb(0, 0, 0, 0.1)",
          fontSize: "1.4rem",
          "&:hover": {
            backgroundColor: "white", // hover color
          },
        }}
      >
        {startIcon && <span className={styles.leftIcon}>{startIcon}</span>}
        {buttonLabel && <p>{buttonLabel}</p>}
        {endIcon && <span className={styles.leftIcon}>{endIcon}</span>}
      </Button>

      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        className={`${styles.dropdownMenu} ${menuClass}`}
        slotProps={{
          list: { "aria-labelledby": "dropdown-button" },
          paper: {
            className: `${styles.dropdownPaper}`, // 👈 your custom class here
            sx: {
              minWidth: anchorEl2 ? anchorEl2.offsetWidth : undefined, // 👈 simpler
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleClose(option)}
            className={styles.dropdownItem}
          >
            {option.icon && (
              <ListItemIcon className={styles.itemIcon}>
                {option.icon}
              </ListItemIcon>
            )}
            {option.label}
            {/* <ListItemText className={styles.dropdownItem_text}>{option.label}</ListItemText> */}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;

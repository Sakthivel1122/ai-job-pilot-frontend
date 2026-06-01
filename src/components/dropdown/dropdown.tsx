"use client";

import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import styles from "./dropdown.module.scss";
import { TDropdownOptionData } from "@/types/dropdown";
import { IoChevronDown } from "react-icons/io5";
import { useTheme } from "next-themes";

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

  const { theme } = useTheme();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = (value?: TDropdownOptionData) => {
    setAnchorEl(null);

    if (value) onSelect(value);
  };

  const isDark = theme === "dark";

  return (
    <div className={`${styles.dropdownWrapper} ${customClass}`}>
      <Button
        id="dropdown-button"
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={`${styles.dropdownButton} ${buttonClass}`}
        sx={{
          backgroundColor: `${
            isDark ? "#1f1f1f" : "#f4f4f4"
          } !important`,

          color: `${isDark ? "#ffffff" : "#000000"} !important`,

          padding: "0.6rem 1rem",

          border: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",

          fontSize: "1.4rem",

          "&:hover": {
            backgroundColor: `${
              isDark ? "#323232" : "#e7e7e7"
            } !important`,
          },
        }}
      >
        {startIcon && (
          <span className={styles.leftIcon}>{startIcon}</span>
        )}

        {buttonLabel && <p>{buttonLabel}</p>}

        {endIcon && (
          <span className={styles.leftIcon}>{endIcon}</span>
        )}
      </Button>

      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        className={`${styles.dropdownMenu} ${menuClass}`}
        slotProps={{
          list: {
            "aria-labelledby": "dropdown-button",
            sx: {
              backgroundColor: isDark ? "#1f1f1f" : "white",
              color: isDark ? "white" : "black",
              padding: "0.4rem",
            },
          },

          paper: {
            className: `${styles.dropdownPaper}`,
            sx: {
              minWidth: anchorEl2
                ? anchorEl2.offsetWidth
                : undefined,
              backgroundColor: isDark ? "#1f1f1f" : "white",
              color: isDark ? "white" : "black",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 20px rgba(0,0,0,0.08)",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleClose(option)}
            className={styles.dropdownItem}
            sx={{
              borderRadius: "8px",

              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "#f5f5f5",
              },
            }}
          >
            {option.icon && (
              <ListItemIcon
                className={styles.itemIcon}
                sx={{
                  color: isDark ? "white" : "black",
                }}
              >
                {option.icon}
              </ListItemIcon>
            )}

            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
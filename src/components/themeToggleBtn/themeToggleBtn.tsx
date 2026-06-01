"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import styles from "./themeToggleBtn.module.scss";

const ThemeToggleBtn = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={styles.ThemeToggleBtn} onClick={handleClick}>
      {theme === "dark" ? (
        <MdOutlineLightMode className={styles.ThemeToggleBtn_icon} />
      ) : (
        <MdOutlineDarkMode className={styles.ThemeToggleBtn_icon} />
      )}
    </div>
  );
};

export default ThemeToggleBtn;

"use client";

import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import styles from "./button.module.scss";
import ThreeDotLoader from "../threeDotLoader/threeDotLoader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent";
  content?: string;
  className?: string;
  textCustomClass?: string;
  disabled?: boolean;
  isLoading?: boolean;
  href?: string;
  newTab?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  content,
  disabled,
  className,
  textCustomClass,
  isLoading,
  href,
  newTab,
  ...props
}) => {
  const btnClass =
    variant === "primary"
      ? styles.primary_btn
      : variant === "secondary"
      ? styles.secondary_btn
      : styles.transparent_btn;

  const btnTextClass =
    variant === "primary"
      ? styles.primary_btn_text
      : variant === "secondary"
      ? styles.secondary_btn_text
      : styles.transparent_btn_text;

  if (href) {
    return (
      <Link
        href={href}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={`${styles.button} ${btnClass} ${className || ""}`}
      >
        {isLoading ? (
          <ThreeDotLoader color="white" size={10} />
        ) : content ? (
          <p className={styles.button_text}>{content}</p>
        ) : (
          children
        )}
      </Link>
    );
  }

  return (
    <button
      className={`${styles.button} ${btnClass} ${className || ""}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ThreeDotLoader color="white" size={10} />
      ) : content ? (
        <p
          className={`${styles.button_text} ${btnTextClass} ${
            textCustomClass || ""
          }`}
        >
          {content}
        </p>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

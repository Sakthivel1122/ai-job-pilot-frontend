"use client";
import { ToastContainer } from "react-toastify";
import styles from "./toastProvider.module.scss";
import { useTheme } from "next-themes";

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      toastClassName={(data: any) => {
        return `Toastify__toast ${
          theme === "light"
            ? "Toastify__toast-theme--light"
            : "Toastify__toast-theme--dark"
        } ${styles.ToastProvider_toaster}
    ${
      data?.type === "success"
        ? styles.ToastProvider_toaster_success
        : data?.type === "error"
        ? styles.ToastProvider_toaster_error
        : data?.type === "warning"
        ? styles.ToastProvider_toaster_warning
        : data?.type === "info"
        ? styles.ToastProvider_toaster_info
        : ""
    }`;
      }}
    />
  );
}
